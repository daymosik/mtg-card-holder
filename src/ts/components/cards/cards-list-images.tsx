import { FunctionalComponent, h } from 'preact'
import { Link } from 'preact-router'
import { ScryCardSimple } from 'models/magic'

export interface CardsListImagesProps {
  cards: ScryCardSimple[]
}

const CardsListImages: FunctionalComponent<CardsListImagesProps> = ({ cards }) => (
  <div className="row d-flex flex-row justify-content-center">
    {cards.map((card) => {
      const imageUrl = card.image_uris?.small
      return (
        <div className="cards-list-image rounded m-2" key={card.id}>
          <Link href={`/card/${card.id}`}>
            {imageUrl ? <img className="lazy" data-src={imageUrl} /> : <i className="fas fa-ban" />}
          </Link>
        </div>
      )
    })}
  </div>
)

export default CardsListImages
