import { FunctionalComponent, h } from 'preact'
import { useEffect } from 'preact/hooks'
import cardRecognition from 'services/card-recognition'

const CardRecognitionView: FunctionalComponent = () => {
  const takePhoto = () => {
    cardRecognition.takePhoto()
  }

  useEffect(() => {
    cardRecognition.initializeCamera()
  })

  return (
    <div class="container">
      <div className="camera">
        <video id="video" autoPlay={true} playsInline={true}>
          Video stream not available.
        </video>
        <button onClick={takePhoto}>Take photo</button>
      </div>
      <canvas id="canvas" width={1920} height={1080} />
      <div className="output">
        <img id="photo" alt="The screen capture will appear in this box." />
      </div>
      <div id="text" />
    </div>
  )
}

export default CardRecognitionView
