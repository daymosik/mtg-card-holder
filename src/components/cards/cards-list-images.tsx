import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'

import { MagicCard } from '../../../types/magic'

interface CardsListImagesProps {
  cards: MagicCard[]
}

const CardsListImages = ({ cards }: CardsListImagesProps) => (
  <div class="row d-flex flex-row justify-content-center">
    {cards.map((card) => (
      <div class="cards-list-image rounded m-2">
        <Link to={`/card/${card.id}`}><img src={card.imageUrl}/></Link>
      </div>
    ))}
  </div>
)

export default CardsListImages
