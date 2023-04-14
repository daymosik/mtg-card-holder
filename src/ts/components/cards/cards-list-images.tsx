import { MagicCard } from 'models/magic'
import { FunctionalComponent, h } from 'preact'
import { Link } from 'preact-router'

export interface CardsListImagesProps {
  cards: MagicCard[]
}

const CardsListImages: FunctionalComponent<CardsListImagesProps> = ({ cards }) => (
  <div className="row d-flex flex-row justify-content-center">
    {cards.map((card) => (
      <div className="cards-list-image rounded m-2" key={card.id}>
        <Link href={`/card/${card.id}`}>
          {card.imageUrl ? <img className="lazy" data-src={card.imageUrl} /> : <i className="fas fa-ban" />}
        </Link>
      </div>
    ))}
  </div>
)

export default CardsListImages
