import ManaCostView from 'components/card/mana-cost'
import { Fragment, FunctionalComponent, h } from 'preact'
import { Link } from 'preact-router'
import { UserMagicCard } from 'store/reducers/card-collection-reducers'
import { ScryCardSimple } from 'models/magic'

import { FixedSizeList as List } from 'react-window'

interface CardsListTableProps {
  cards: Array<ScryCardSimple | UserMagicCard>
  decreaseCardCount?: (card: ScryCardSimple) => void
}

const isUsercard = (card: ScryCardSimple | UserMagicCard): card is UserMagicCard =>
  !!card && 'count' in card ? card.count !== undefined : false

const CardsListTable: FunctionalComponent<CardsListTableProps> = ({ cards, decreaseCardCount }) => {
  const isUserCard = isUsercard(cards[0])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const Row = ({ index, style }) => {
    const card = cards[index]
    if (!card) {
      return null
    }
    const isUserCard = isUsercard(card)
    return (
      <div style={style} className="card-list-row">
        <div style={{ width: '5%' }} scope="row">
          {index + 1}
        </div>
        <div style={{ width: '30%' }}>
          <Link href={`/card/${card.id}`}>{card.name}</Link>
        </div>
        <div style={{ width: '30%' }}>{card.type_line}</div>
        <div style={{ width: '20%' }}>{ManaCostView(card.mana_cost)}</div>
        {isUserCard && (
          <Fragment>
            <div style={{ width: '5%' }}>{card.count}</div>
            {decreaseCardCount && (
              <div>
                <button className="btn btn-sm btn-danger" onClick={() => decreaseCardCount(card)}>
                  X
                </button>
              </div>
            )}
          </Fragment>
        )}
      </div>
    )
  }

  return (
    <div className="bg-dark bg-opacity-75 p-3 rounded-3">
      <div className="card-list-row pe-3">
        <div style={{ width: '5%' }}>#</div>
        <div style={{ width: '30%' }}>Name</div>
        <div style={{ width: '30%' }}>Type</div>
        <div style={{ width: '20%' }}></div>
        {isUserCard && (
          <Fragment>
            <div style={{ width: '5%' }}>Count</div>
            {decreaseCardCount && <div>&nbsp;</div>}
          </Fragment>
        )}
      </div>

      <List height={600} itemCount={cards.length} itemSize={40} width="100%">
        {Row}
      </List>
    </div>
  )
}

// TODO
// export interface CardListItemProps extends FixedSizeListProps {
//   card: UserMagicCard | ScryCardSimple
//   index: number
//   decreaseCardCount?: (card: ScryCardSimple) => void
// }

export default CardsListTable
