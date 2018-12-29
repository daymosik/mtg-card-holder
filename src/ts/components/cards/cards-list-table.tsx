import { MagicCard } from '@models/magic'
import { UserMagicCard } from '@modules/card-collection/card-collection'
import ManaCostView from '@modules/card/mana-cost'
import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'

interface CardsListTableProps {
  cards: Array<MagicCard | UserMagicCard>
  decreaseCardCount?: any
}

const isUsercard = (card: MagicCard | UserMagicCard): card is UserMagicCard => (
  (card as UserMagicCard).count !== undefined
)

const CardsListTable = ({ cards, decreaseCardCount }: CardsListTableProps) => {
  const isUserCard = isUsercard(cards[0])
  return (
    <table class="table table-dark bg-transparent">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th></th>
        {isUserCard && <th scope="col" class="text-center">Count</th>}
        {isUserCard && <th></th>}
      </tr>
      </thead>
      <tbody>
      {cards && cards.map((card, key) => (
        <CardsListTableItem key={key} card={card} decreaseCardCount={decreaseCardCount}/>
      ))}
      </tbody>
    </table>
  )
}

interface CardListItemProps {
  card: any
  // TODO
  // card: UserMagicCard | MagicCard
  key: number
  decreaseCardCount?: any
}

const CardsListTableItem = ({ card, key, decreaseCardCount }: CardListItemProps) => {
  const isUserCard = isUsercard(card)
  return (
    <tr>
      <th scope="row">{key + 1}</th>
      <td><Link to={`/card/${card.id}`}>{card.name}</Link></td>
      <td>{card.type}</td>
      <td class="text-right">{ManaCostView(card.manaCost)}</td>
      {isUserCard && <td class="text-center">{card.count}</td>}
      {isUserCard && <th>
        <button class="btn btn-danger" onclick={() => decreaseCardCount(card)}>X</button>
      </th>}
    </tr>
  )
}

export default CardsListTable
