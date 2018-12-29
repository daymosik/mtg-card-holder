import { AppActions, AppState } from '@app'
import CardsListImages from '@components/cards/cards-list-images'
import CardsListSwitcher, { CardsDisplayType } from '@components/cards/cards-list-switcher'
import CardsListTable from '@components/cards/cards-list-table'
import LoadingSpinner from '@components/loading-spinner'
import { MagicCard, MagicSet } from '@models/magic'
import CardDatabaseService from '@services/card-database'
import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'

export interface CardSetState {
  set: MagicSet | undefined,
  cards: MagicCard[],
  displayType: CardsDisplayType,
}

export const initialCardSetState: CardSetState = {
  set: undefined,
  cards: [],
  displayType: CardsDisplayType.List,
}

type GetCardsCommitPayload = [MagicCard[], MagicSet]

export interface CardSetActions {
  initView: (setId: string) => (state: CardSetState, actions: CardSetActions) => CardSetState,
  getCardsCommit: (object: GetCardsCommitPayload) => (state: CardSetState) => CardSetState,
  setDisplayType: (displayType: CardsDisplayType) => (state: CardSetState) => CardSetState,
}

export const cardSetActions: CardSetActions = {
  initView: (setId: string) => (state: CardSetState, actions: CardSetActions) => {
    Promise.all([
      CardDatabaseService.getCardsBySet(setId),
      CardDatabaseService.getSet(setId),
    ]).then((response) => actions.getCardsCommit(response))
    return initialCardSetState
  },
  getCardsCommit: ([cards, set]) => (state: CardSetState): CardSetState => ({
    ...state,
    cards,
    set,
  }),
  setDisplayType: (displayType: CardsDisplayType) => (state: CardSetState): CardSetState => ({ ...state, displayType }),
}

export const SetView = (state: AppState, actions: AppActions) => ({ match }) => {
  const cards = state.cardSet.cards
  return (
    <div class="container" oncreate={() => actions.cardSet.initView(match.params.code)}>
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
