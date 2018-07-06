import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import { MagicCard } from '../../../types/magic'
import { AppActions, AppState } from '../../app'
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
      </tr>
    </thead>
    <tbody>
      {cards && cards.map((card) => <CardListItem card={card}/>)}
    </tbody>
  </table>
)

interface CardListItemProps {
  card: MagicCard
}

const CardListItem = ({ card }: CardListItemProps) => (
  <tr>
    <th scope="row">1</th>
    <td><Link to={`/card/${card._id}`}>{card.name}</Link></td>
    <td>{card.type}</td>
  </tr>
)

export const SetView = (state: AppState, actions: AppActions) => ({ match }) => (
  <div oncreate={() => actions.cardSet.getCards(match.params.code)}>
    {!state.cardSet.cards.length && <LoadingSpinner/>}
    {state.cardSet.cards.length > 0 && <CardListTable cards={state.cardSet.cards}/>}
  </div>
)

export default SetView
