import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import { MagicCard, MagicSet } from '../../../types/magic'
import { AppActions, AppState } from '../../app'
import LoadingSpinner from '../../components/loading-spinner'
import CardDatabaseService from '../../services/card-database'
import ManaCostView from '../card/mana-cost'

enum CardsDisplayType {
  List = 'list',
  Images = 'images',
}

export interface CardSetState {
  set: MagicSet | null,
  cards: MagicCard[],
  displayType: CardsDisplayType,
}

export const initialCardSetState: CardSetState = {
  set: null,
  cards: [],
  displayType: CardsDisplayType.List,
}

interface GetCardsCommitPayload {
  cards: MagicCard[],
  set: MagicSet
}

export interface CardSetActions {
  getCards: (set: string) => (state: CardSetState, actions: CardSetActions) => Promise<MagicCard[]>,
  getCardsCommit: (object: GetCardsCommitPayload) => (state: CardSetState) => CardSetState,
  setDisplayType: (displayType: CardsDisplayType) => (state: CardSetState) => CardSetState,
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
  setDisplayType: (displayType: CardsDisplayType) => (state: CardSetState): CardSetState => ({...state, displayType}),
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
    <th scope="row">{key + 1}</th>
    <td><Link to={`/card/${card.id}`}>{card.name}</Link></td>
    <td>{card.type}</td>
    <td class="text-right">{ManaCostView(card.manaCost)}</td>
  </tr>
)

interface CardImagesTableProps {
  cards: MagicCard[]
}

const CardImagesTable = ({ cards }: CardImagesTableProps) => (
  <div class="row d-flex flex-row justify-content-center">
    {cards.map((card) => (
      <div class="p-2">
        <Link to={`/card/${card.id}`}><img src={card.imageUrl}/></Link>
      </div>
    ))}
  </div>
)

interface SetViewTypeSelectProps {
  setDisplayType: (displayType: CardsDisplayType) => (state: CardSetState) => CardSetState,
}

const SetViewTypeSelect = ({setDisplayType}: SetViewTypeSelectProps) => (
  <div class="ml-auto pt-sm-3">
    <a class="m-2 p-2 bg-dark h3 rounded" onclick={() => setDisplayType(CardsDisplayType.List)}>
      <i class="fas fa-bars"/>
    </a>
    <a class="m-2 p-2 bg-dark h3 rounded" onclick={() => setDisplayType(CardsDisplayType.Images)}>
      <i class="fas fa-grip-horizontal"/>
    </a>
  </div>
)

export const SetView = (state: AppState, actions: AppActions) => ({ match }) => {
  const cards = state.cardSet.cards
  return (
    <div class="container" oncreate={() => actions.cardSet.getCards(match.params.code)}>
      {!state.cardSet.set && <LoadingSpinner/>}
      {state.cardSet.set &&
      <div>
        <div class="row">
          <h1><i class={`m-3 ss ss-${state.cardSet.set.code.toLowerCase()}`}/> {state.cardSet.set.name}</h1>
          <SetViewTypeSelect setDisplayType={actions.cardSet.setDisplayType}/>
        </div>
        {cards.length > 0 &&
        <div>
          {state.cardSet.displayType === CardsDisplayType.List && <CardListTable cards={cards}/>}
          {state.cardSet.displayType === CardsDisplayType.Images && <CardImagesTable cards={cards}/>}
        </div>}
      </div>}

    </div>
  )
}

export default SetView
