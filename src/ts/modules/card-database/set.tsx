import { appActions, AppState } from '@app'
import CardsListImages from '@components/cards/cards-list-images'
import CardsListSwitcher, { CardsDisplayType } from '@components/cards/cards-list-switcher'
import CardsListTable from '@components/cards/cards-list-table'
import LoadingSpinner from '@components/loading-spinner'
import { MagicCard, MagicSet } from '@models/magic'
import { MatchProps } from '@services/location'
import { h } from 'hyperapp'

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
  getCardsCommit: (state: AppState, object: GetCardsCommitPayload) => AppState,
  setDisplayType: (displayType: CardsDisplayType) => (state: CardSetState) => CardSetState,
}

export const cardSetActions: CardSetActions = {
  getCardsCommit: (state, [cards, set]) => ({
    ...state,
    cardSet: {
      ...state.cardSet,
      cards,
      set,
    },
  }),
  setDisplayType: (displayType: CardsDisplayType) => (state: CardSetState): CardSetState => ({ ...state, displayType }),
}

export const SetView = (state: AppState & MatchProps) => {
  const cards = state.cardSet.cards

  const event = new CustomEvent('init-set-view', { detail: state.params.code })
  if (!state.cardSet.set || state.cardSet.set.code !== state.params.code) {
    dispatchEvent(event)
  }

  return (
    <div class="container">
      {!state.cardSet.set && <LoadingSpinner/>}
      {state.cardSet.set &&
      <div>
        <div class="row">
          <h1><i class={`m-3 ss ss-${state.cardSet.set.code.toLowerCase()}`}/> {state.cardSet.set.name}</h1>
          <CardsListSwitcher className="ml-auto pt-sm-3" setDisplayType={appActions.cardSet.setDisplayType}/>
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
