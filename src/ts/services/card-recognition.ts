import { createWorker, ImageLike } from 'tesseract.js'
import 'image-capture'

// TODO
/* Safari and Edge polyfill for createImageBitmap
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap
 */
if (!('createImageBitmap' in window)) {
  window.createImageBitmap = async function (blob) {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img')
      img.addEventListener('load', function () {
        resolve(this)
      })
      img.src = URL.createObjectURL(blob)
    })
  }
}

let imageCapture: ImageCapture

const cardRecognition = {
  demo: (): Promise<string> => {
    // const image = 'https://tesseract.projectnaptha.com/img/eng_bw.png'
    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
    // const image = require('../../assets/images/eng_bw.png').default
    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const image = require('../../assets/images/magic-card-photo2.jpg').default

    return cardRecognition.recognizeText(image)
  },
  recognizeText: async (image: ImageLike): Promise<string> => {
    const worker = createWorker({
      logger: (m) => console.log(m),
    })

    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')

    const {
      data: { text },
    } = await worker.recognize(image)

    console.log(text)

    return text
  },
  initializeCamera: () => {
    const videoHolder = document.querySelector('video') as HTMLVideoElement

    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: 'environment',
        },
      })
      .then((mediaStream) => {
        videoHolder.srcObject = mediaStream

        const track = mediaStream.getVideoTracks()[0]
        imageCapture = new ImageCapture(track)

        return imageCapture.getPhotoCapabilities()
      })
      .then((photoCapabilities) => {
        // const settings = imageCapture.track.getSettings()

        console.log(photoCapabilities)

        // input.min = photoCapabilities.imageWidth.min
        // input.max = photoCapabilities.imageWidth.max
        // input.step = photoCapabilities.imageWidth.step

        // return imageCapture.getPhotoSettings()
      })
      // .then((photoSettings) => {
      //   input.value = photoSettings.imageWidth
      // })
      .catch((error) => console.log('Argh!', error))
  },
  takePhoto: () => {
    async function drawCanvas(img: ImageBitmap): void {
      const canvas = document.querySelector('canvas')
      if (!canvas) {
        return
      }
      canvas.width = getComputedStyle(canvas).width.split('px')[0]
      canvas.height = getComputedStyle(canvas).height.split('px')[0]
      const ratio = Math.min(canvas.width / img.width, canvas.height / img.height)
      const x = (canvas.width - img.width * ratio) / 2
      const y = (canvas.height - img.height * ratio) / 2
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio)

      const data = canvas.toDataURL('image/png', 1)
      const text = await cardRecognition.recognizeText(data)

      const textHolder = document.getElementById('text')
      textHolder.append(text)
    }

    const imageWidth = 640 // input.value
    imageCapture
      .takePhoto({ imageWidth })
      .then((blob) => {
        return createImageBitmap(blob)
      })
      .then((imageBitmap) => {
        drawCanvas(imageBitmap)

        // void cardRecognition.recognizeText(imageBitmap)

        const textHolder = document.getElementById('text')
        textHolder.append(`Photo size is ${imageBitmap.width}x${imageBitmap.height}`)

        console.log(`Photo size is ${imageBitmap.width}x${imageBitmap.height}`)
      })
      .catch((error) => console.log(error))
  },
  // TODO
  // clearphoto: () => {
  //   const context = canvas.getContext('2d')
  //   context.fillStyle = '#AAA'
  //   context.fillRect(0, 0, canvas.width, canvas.height)
  //
  //   const data = canvas.toDataURL('image/png')
  //   photo.setAttribute('src', data)
  // }
}

export default cardRecognition
