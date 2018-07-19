import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import { MagicCard, MagicSet } from '../../../types/magic'
import { AppActions, AppState } from '../../app'
import LoadingSpinner from '../../components/loading-spinner'
import CardDatabaseService from '../../services/card-database'
import ManaCostView from '../card/mana-cost'

export interface CardSetState {
  set: MagicSet | null,
  cards: MagicCard[],
}

export const initialCardSetState: CardSetState = {
  set: null,
  cards: [],
}

interface GetCardsCommitPayload {
  cards: MagicCard[],
  set: MagicSet
}

export interface CardSetActions {
  getCards: (set: string) => (state: CardSetState, actions: CardSetActions) => Promise<MagicCard[]>,
  getCardsCommit: (object: GetCardsCommitPayload) => (state: CardSetState) => CardSetState
}

export const cardSetActions: CardSetActions = {
  getCards: (set) => async (state: CardSetState, actions: CardSetActions) => {
    const setInfo: MagicSet = await CardDatabaseService.getSet(set)
    const cards: MagicCard[] = await CardDatabaseService.getCardsBySet(set)
    actions.getCardsCommit({ cards, set: setInfo })
    return cards
  },
  getCardsCommit: ({ cards, set }) => (state: CardSetState): CardSetState => ({
    ...state,
    cards,
    set,
  }),
}

interface CardListTableProps {
  cards: MagicCard[]
}

const CardListTable = ({ cards }: CardListTableProps) => (
  <table class="table table-dark bg-transparent">
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
  <div class="container" oncreate={() => actions.cardSet.getCards(match.params.code)}>
    {!state.cardSet.set && <LoadingSpinner/>}
    {state.cardSet.set &&
    <div>
      <h1>
        <i class={`m-3 ss ss-${state.cardSet.set.code.toLowerCase()}`}/>
        {state.cardSet.set.name}
      </h1>
      {state.cardSet.cards.length > 0 && <CardListTable cards={state.cardSet.cards}/>}
    </div>}

  </div>
)

export default SetView
