import { FunctionalComponent, h } from 'preact'

export const HomeView: FunctionalComponent = () => {
  return (
    <div className="container">
      <figure>
        <blockquote className="blockquote">
          <p>Home</p>
        </blockquote>
        <figcaption className="blockquote-footer">
          Welcome to the <i>Magic: The Gathering</i> card database
        </figcaption>
      </figure>

      <hr />
    </div>
  )
}
