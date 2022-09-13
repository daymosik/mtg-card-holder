import ManaCostView from 'components/card/mana-cost'
import { MagicCard } from 'models/magic'
import { FunctionalComponent, h } from 'preact'
import { Link } from 'preact-router'
import { UserMagicCard } from 'store/reducers/card-collection-reducers'

interface CardsListTableProps {
  cards: Array<MagicCard | UserMagicCard>
  decreaseCardCount?: (card: MagicCard) => void
}

const isUsercard = (card: MagicCard | UserMagicCard): card is UserMagicCard =>
  (card as UserMagicCard).count !== undefined

const CardsListTable: FunctionalComponent<CardsListTableProps> = ({ cards, decreaseCardCount }) => {
  const isUserCard = isUsercard(cards[0])
  return (
    <table class="table table-dark bg-transparent">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th></th>
          {isUserCard && (
            <th scope="col" class="text-center">
              Count
            </th>
          )}
          {isUserCard && <th></th>}
        </tr>
      </thead>
      <tbody>
        {cards &&
          cards.map((card, index) => (
            <CardsListTableItem key={card.id} index={index} card={card} decreaseCardCount={decreaseCardCount} />
          ))}
      </tbody>
    </table>
  )
}

export interface CardListItemProps {
  card: UserMagicCard | MagicCard
  index: number
  decreaseCardCount?: (card: MagicCard) => void
}

const CardsListTableItem: FunctionalComponent<CardListItemProps> = ({ card, index, decreaseCardCount }) => {
  const isUserCard = isUsercard(card)
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>
        <Link href={`/card/${card.id}`}>{card.name}</Link>
      </td>
      <td>{card.type}</td>
      <td class="text-right">{ManaCostView(card.manaCost)}</td>
      {isUserCard && <td class="text-center">{card.count}</td>}

      {isUserCard && decreaseCardCount && (
        <th>
          <button class="btn btn-sm btn-danger" onClick={() => decreaseCardCount(card)}>
            X
          </button>
        </th>
      )}
    </tr>
  )
}

export default CardsListTable
