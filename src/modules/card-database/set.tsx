import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import { MagicCard } from '../../../types/magic'
import { AppActions, AppState } from '../../app'
import ManaCostView from '../../components/card/mana-cost'
import LoadingSpinner from '../../components/loading-spinner'
import CardDatabaseService from '../../services/card-database'

export interface CardSetState {
  cards: MagicCard[],
}

export const initialCardSetState: CardSetState = {
  cards: [],
}

export interface CardSetActions {
  getCards: (set: string) => (state: CardSetState, actions: CardSetActions) => Promise<MagicCard[]>,
  getCardsCommit: (cards: MagicCard[]) => (state: CardSetState) => CardSetState
}

export const cardSetActions: CardSetActions = {
  getCards: (set) => async (state: CardSetState, actions: CardSetActions) => {
    // try {
    const cards: MagicCard[] = await CardDatabaseService.getCardsBySet(set)
    actions.getCardsCommit(cards)
    return cards
    // } catch (e) {
    //   console.log(e)
    // }
  },
  getCardsCommit: (cards: MagicCard[]) => (state: CardSetState): CardSetState => ({ ...state, cards }),
}

interface CardListTableProps {
  cards: MagicCard[]
}

const CardListTable = ({ cards }: CardListTableProps) => (
  <table class="table table-light">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {cards && cards.map((card, key) => <CardListItem key={key} card={card}/>)}
    </tbody>
  </table>
)

interface CardListItemProps {
  card: MagicCard
  key: number
}

const CardListItem = ({ card, key }: CardListItemProps) => (
  <tr>
    <th scope="row">{key}</th>
    <td><Link to={`/card/${card.id}`}>{card.name}</Link></td>
    <td>{card.type}</td>
    <td class="text-right">{ManaCostView(card.manaCost)}</td>
  </tr>
)

export const SetView = (state: AppState, actions: AppActions) => ({ match }) => (
  <div oncreate={() => actions.cardSet.getCards(match.params.code)}>
    {!state.cardSet.cards.length && <LoadingSpinner/>}
    {state.cardSet.cards.length > 0 && <CardListTable cards={state.cardSet.cards}/>}
  </div>
)

export default SetView
