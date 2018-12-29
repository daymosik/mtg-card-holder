import { AppActions, AppState } from '@app'
import { Webcam } from '@services/webcam'
import * as tf from '@tensorflow/tfjs'
import { h } from 'hyperapp'
import { Tesseract } from 'tesseract.ts'

// The number of classes we want to predict. In this example, we will be
// predicting 4 classes for up, down, left, and right.
const NUM_CLASSES = 4

const myImage = require('../../../assets/images/cards/dusk-text.png')
// const myImage = require('../../../assets/images/cards/demo.gif')

const initWebcam = () => {
  // A webcam class that generates Tensors from the images from the webcam.
  const webcam = new Webcam(document.getElementById('webcam'))
  const resultBox = document.getElementById('result')

  async function init() {
    try {
      await webcam.setup()
    } catch (e) {
      console.log('webcam setup failure')
    }
    // truncatedMobileNet = await loadTruncatedMobileNet()

    // Warm up the model. This uploads weights to the GPU and compiles the WebGL
    // programs so the first time we collect data from the webcam it will be
    // quick.
    // tf.tidy(() => truncatedMobileNet.predict(webcam.capture()))


    // const img = webcam.capture()
    // console.log(img)


    // Tesseract.recognize(myImage)
    //   .progress((p) => {
    //     console.log('progress', p)
    //   })
    //   .then((result) => {
    //     console.log(result)
    //     if (resultBox) {
    //       resultBox.innerHTML = result.html
    //     }
    //   })

    const model = tf.sequential()
    model.add(tf.layers.dense({ units: 100, activation: 'relu', inputShape: [10] }))
    model.add(tf.layers.dense({ units: 1, activation: 'linear' }))
    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' })

    const xs = tf.randomNormal([100, 10])
    const ys = tf.randomNormal([100, 1])

    model.fit(xs, ys, {
      epochs: 100,
      callbacks: [{
        onEpochEnd: (epoch, log) => {
          console.log(`Epoch ${epoch}: loss = ${log.loss}`)
          return Promise.resolve()
        },
      }],
    })

  }

  // Initialize the application.
  init()
}

export const CameraView = (state: AppState, actions: AppActions) => () => {
  return (
    <div class="container" oncreate={() => initWebcam()}>
      <div class="text-center">
        <video autoPlay playsinline muted id="webcam" width="224" height="224"/>
        <pre id="result"/>
      </div>
    </div>
  )
}

export default CameraView
