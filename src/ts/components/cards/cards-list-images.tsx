import { MagicCard } from '@models/magic'
import LazyLoad from '@utils/lazy-load'
import { h } from 'hyperapp'
import { Link } from '@services/location'

interface CardsListImagesProps {
  cards: MagicCard[]
}

const CardsListImages = ({ cards }: CardsListImagesProps) => (
  <div class="row d-flex flex-row justify-content-center" oncreate={LazyLoad.lazyLoad}>
    {cards.map((card) => (
      <div class="cards-list-image rounded m-2">
        <Link to={`/card/${card.id}`}>
          {card.imageUrl ? <img class="lazy" data-src={card.imageUrl}/> : <i class="fas fa-ban"/>}
        </Link>
      </div>
    ))}
  </div>
)

export default CardsListImages
