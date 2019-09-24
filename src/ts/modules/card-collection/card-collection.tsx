import { appActions, AppActions, AppState } from '@app'
import CardsListImages from '@components/cards/cards-list-images'
import { CardsDisplayType, default as CardsListSwitcher } from '@components/cards/cards-list-switcher'
import CardsListTable from '@components/cards/cards-list-table'
import LoadingSpinner from '@components/loading-spinner'
import { MagicCard } from '@models/magic'
import CardDatabaseService from '@services/card-database'
import firebase = require('firebase/app')
import 'firebase/auth'
import { h } from 'hyperapp'
import { Link } from '@services/location'
import AddCardForm from './add-card-form'

export interface UserMagicCard extends MagicCard {
  count: number
}

export interface UserMagicCardCollection {
  [id: string]: UserMagicCard,
}

export interface CardCollectionState {
  cards: UserMagicCardCollection
  displayType: CardsDisplayType
}

export const initialCardCollectionState: CardCollectionState = {
  cards: {},
  displayType: CardsDisplayType.List,
}

export interface CardCollectionActions {
  initView: () => (state: CardCollectionState, actions: CardCollectionActions) => void
  updateCardsList: (card: UserMagicCard) => (state: CardCollectionState) => CardCollectionState
  removeCardFromCollection: (card: UserMagicCard) => (state: CardCollectionState) => Promise<MagicCard>
  setDisplayType: (displayType: CardsDisplayType) => (state: CardCollectionState) => CardCollectionState,
}

let USER_CARD_SUBSCRIBER

export const cardCollectionActions: CardCollectionActions = {
  initView: () => (state: CardCollectionState, actions: CardCollectionActions): void => {
    const user = firebase.auth().currentUser
    if (!user || !!USER_CARD_SUBSCRIBER) {
      return
    }
    USER_CARD_SUBSCRIBER = CardDatabaseService.userCardsSubscriber(user.uid)
      .subscribe((value) => actions.updateCardsList(value))
  },
  updateCardsList: (card: UserMagicCard) => (state: CardCollectionState): CardCollectionState => ({
    ...state,
    cards: {
      ...state.cards,
      [card.id]: card,
    },
  }),
  removeCardFromCollection: (card: MagicCard) => async () => CardDatabaseService.removeCardFromCollection(card),
  setDisplayType: (displayType: CardsDisplayType) => (state: CardCollectionState): CardCollectionState => ({
    ...state,
    displayType,
  }),
}

export const CardCollectionView = (state: AppState) => {
  const cards = Object.keys(state.cardCollection.cards).map((key) => state.cardCollection.cards[key])
    .filter((card) => card.count > 0)
  return (
    <div class="container">
      <AddCardForm {...state}/>
      <div oncreate={() => appActions.cardCollection.initView()}>
        {!cards.length && <LoadingSpinner/>}
        {cards.length > 0 &&
        <div>
          <div class="row">
            <CardsListSwitcher className="ml-auto" setDisplayType={appActions.cardCollection.setDisplayType}/>
          </div>
          {state.cardCollection.displayType === CardsDisplayType.List && (
            <CardsListTable cards={cards} decreaseCardCount={appActions.cardCollection.removeCardFromCollection}/>
          )}
          {state.cardCollection.displayType === CardsDisplayType.Images && <CardsListImages cards={cards}/>}
        </div>}
      </div>
    </div>
  )
}

export default CardCollectionView
