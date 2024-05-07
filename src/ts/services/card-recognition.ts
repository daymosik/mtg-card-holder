import { CustomMobileNet, Webcam } from '@teachablemachine/image'
import { createWorker, ImageLike } from 'tesseract.js'
import 'image-capture'
import 'utils/create-image-bitmap'

// import * as tf from '@tensorflow/tfjs'
import * as tmImage from '@teachablemachine/image'

const TENSORFLOW_MODELS_URL = 'https://teachablemachine.withgoogle.com/models/YgHSN5ctZ/'

// tensorflow
let webcam: Webcam
let tensorflowModel: CustomMobileNet
let maxPredictions: number
let predictionLabelElement: HTMLElement

let cardRecognitionElement: HTMLElement
let canvasElement: HTMLCanvasElement
let photoCanvasElement: HTMLCanvasElement
let videoElement: HTMLVideoElement
let logsElement: HTMLElement

let imageCapture: ImageCapture

const cardRecognition = {
  init: async (): Promise<void> => {
    cardRecognition.initializeDOM()
    await cardRecognition.initializeTensorflow()
    await cardRecognition.initializeImageCapture()
  },
  initializeDOM: (): void => {
    cardRecognitionElement = document.getElementById('card-recognition-view') || document.createElement('div')

    canvasElement = document.createElement('canvas')
    // cardRecognitionElement.appendChild(canvasView)

    videoElement = document.createElement('video')
    videoElement.autoplay = true
    videoElement.playsInline = true
    cardRecognitionElement.appendChild(videoElement)

    predictionLabelElement = document.createElement('div')
    cardRecognitionElement.appendChild(predictionLabelElement)

    photoCanvasElement = document.createElement('canvas')
    cardRecognitionElement.appendChild(photoCanvasElement)

    logsElement = document.createElement('div')
    logsElement.style.whiteSpace = 'pre-line'
    cardRecognitionElement.appendChild(logsElement)
  },
  initializeTensorflow: async (): Promise<void> => {
    const modelURL = `${TENSORFLOW_MODELS_URL}model.json`
    const metadataURL = `${TENSORFLOW_MODELS_URL}metadata.json`

    tensorflowModel = await tmImage.load(modelURL, metadataURL)
    maxPredictions = tensorflowModel.getTotalClasses()

    webcam = new tmImage.Webcam(200, 200, false)
    webcam.webcam = videoElement
    webcam.canvas = canvasElement

    videoElement.srcObject = await window.navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    videoElement.addEventListener('loadedmetadata', () => {
      const { videoWidth: vw, videoHeight: vh } = videoElement
      videoElement.width = vw
      videoElement.height = vh
    })

    await webcam.setup()
    await webcam.play()
    window.requestAnimationFrame(() => void loop())

    for (let i = 0; i < maxPredictions; i++) {
      predictionLabelElement.appendChild(document.createElement('div'))
    }
  },
  initializeImageCapture: async (): Promise<void> => {
    try {
      const track = (webcam.webcam.srcObject as MediaStream).getVideoTracks()[0]
      imageCapture = new ImageCapture(track)

      const photoCapabilities = await imageCapture.getPhotoCapabilities()
      console.log(photoCapabilities)

      const settings = imageCapture.track.getSettings()
      console.log(settings)

      const photoSettings = await imageCapture.getPhotoSettings()
      console.log(photoSettings)
    } catch (error) {
      console.log('Argh!', error)
    }
  },
  takePhoto: async (): Promise<void> => {
    try {
      const blob = await imageCapture.takePhoto({
        // TODO
        // imageWidth: 640,
        // fillLightMode: 'flash',
      })
      const imageBitmap = await createImageBitmap(blob)

      const logText = `Photo size is ${imageBitmap.width}x${imageBitmap.height}`
      console.log(logText)
      logsElement.append(logText)
      logsElement.append('\n')

      cardRecognition.drawPhotoCanvas(imageBitmap)
      await cardRecognition.recognizeTextFromPhoto(imageBitmap)
    } catch (error) {
      console.log(error)
    }
  },
  drawPhotoCanvas: (img: ImageBitmap): void => {
    photoCanvasElement.width = parseInt(getComputedStyle(photoCanvasElement).width.split('px')[0])
    photoCanvasElement.height = parseInt(getComputedStyle(photoCanvasElement).height.split('px')[0])

    const ratio = Math.min(photoCanvasElement.width / img.width, photoCanvasElement.height / img.height)
    const x = (photoCanvasElement.width - img.width * ratio) / 2
    const y = (photoCanvasElement.height - img.height * ratio) / 2

    const ctx = photoCanvasElement.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, photoCanvasElement.width, photoCanvasElement.height)
    }
    const ctx2 = photoCanvasElement.getContext('2d')
    if (ctx2) {
      ctx2.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio)
    }
  },
  recognizeTextFromPhoto: async (img: ImageBitmap): Promise<void> => {
    const image = cardRecognition.blobToImage(img)
    const text = await cardRecognition.recognizeText(image)

    logsElement.append(text)
    logsElement.append('\n')
  },
  blobToImage: (img: ImageBitmap): string => {
    const width = img.width > img.height ? 1280 : 720
    const height = img.width > img.height ? 720 : 1280

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(img, 0, 0, width, height)
    }
    return canvas.toDataURL('image/jpeg')
  },
  recognizeText: async (image: ImageLike): Promise<string> => {
    const [worker] = await Promise.all([
      createWorker({
        logger: (m) => console.log(m),
      }),
    ])

    await worker.load()
    // await worker.loadLanguage('eng')
    // await worker.initialize('eng')
    const {
      data: { text },
    } = await worker.recognize(image)
    await worker.terminate()

    console.log(text)

    return text
  },
  demoTextRecognition: (): Promise<string> => {
    // const image = 'https://tesseract.projectnaptha.com/img/eng_bw.png'
    // const image = require('../../assets/images/eng_bw.png').default
    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const image: ImageLike = require('../../assets/images/magic-card-photo2.jpg').default

    return cardRecognition.recognizeText(image)
  },
}

async function loop() {
  webcam.update()
  await predict()
  window.requestAnimationFrame(() => void loop())
}

interface Prediction {
  className: string
  probability: number
}

async function predict() {
  // predict can take in an image, video or canvas html element
  const predictions = await tensorflowModel.predict(webcam.canvas)
  for (let i = 0; i < maxPredictions; i++) {
    const prediction: Prediction = predictions[i]

    ;(predictionLabelElement.childNodes[i] as HTMLElement).innerHTML = `${
      prediction.className
    }: ${prediction.probability.toFixed(2)}`

    if ((i === 0 || i === 1) && prediction.probability >= 0.99) {
      console.log('auto photo')
      await cardRecognition.takePhoto()
    }
  }
}

export default cardRecognition
