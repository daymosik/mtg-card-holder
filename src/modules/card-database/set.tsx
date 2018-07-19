import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import { MagicCard, MagicSet } from '../../../types/magic'
import { AppActions, AppState } from '../../app'
import CardsListImages from '../../components/cards/cards-list-images'
import CardsListSwitcher, { CardsDisplayType } from '../../components/cards/cards-list-switcher'
import CardsListTable from '../../components/cards/cards-list-table'
import LoadingSpinner from '../../components/loading-spinner'
import CardDatabaseService from '../../services/card-database'

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
  setDisplayType: (displayType: CardsDisplayType) => (state: CardSetState): CardSetState => ({ ...state, displayType }),
}

export const SetView = (state: AppState, actions: AppActions) => ({ match }) => {
  const cards = state.cardSet.cards
  return (
    <div class="container" oncreate={() => actions.cardSet.getCards(match.params.code)}>
      {!state.cardSet.set && <LoadingSpinner/>}
      {state.cardSet.set &&
      <div>
        <div class="row">
          <h1><i class={`m-3 ss ss-${state.cardSet.set.code.toLowerCase()}`}/> {state.cardSet.set.name}</h1>
          <CardsListSwitcher className="ml-auto pt-sm-3" setDisplayType={actions.cardSet.setDisplayType}/>
        </div>
        {cards.length > 0 &&
        <div>
          {state.cardSet.displayType === CardsDisplayType.List && <CardsListTable cards={cards}/>}
          {state.cardSet.displayType === CardsDisplayType.Images && <CardsListImages cards={cards}/>}
        </div>}
      </div>}

    </div>
  )
}

export default SetView
