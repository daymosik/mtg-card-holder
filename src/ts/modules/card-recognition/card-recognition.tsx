import { FunctionalComponent, h } from 'preact'
import { useEffect } from 'preact/hooks'
import cardRecognition from 'services/card-recognition'

const CardRecognitionView: FunctionalComponent = () => {
  const takePhoto = () => {
    void cardRecognition.takePhoto()
  }

  useEffect(() => {
    void cardRecognition.init()
  })

  return (
    <div className="container">
      <figure>
        <blockquote className="blockquote">
          <p>Card Recognition</p>
        </blockquote>
        <figcaption className="blockquote-footer">Recognize cards from a photo</figcaption>
      </figure>

      <hr />

      <div id="card-recognition-view">
        <button className="btn btn-danger" onClick={takePhoto}>
          Take photo
        </button>
      </div>
    </div>
  )
}

export default CardRecognitionView
