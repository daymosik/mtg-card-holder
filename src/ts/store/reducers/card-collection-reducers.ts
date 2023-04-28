import { CardsDisplayType } from 'components/cards/cards-list-switcher'
import {
  CardCollectionActionsTypes,
  CardCollectionActionTypesKeys,
} from 'store/actions-types/card-collection-actions-types'
import { ScryCardSimple } from 'models/magic'

export interface UserMagicCard extends ScryCardSimple {
  count: number
}

export interface UserMagicCardCollection {
  [id: string]: UserMagicCard
}

export interface CardCollectionState {
  cards: UserMagicCardCollection
  displayType: CardsDisplayType
}

const initialState: CardCollectionState = {
  cards: {},
  displayType: CardsDisplayType.List,
}

const cardDatabaseState = (
  state: CardCollectionState = initialState,
  action: CardCollectionActionsTypes,
): CardCollectionState => {
  switch (action.type) {
    case CardCollectionActionTypesKeys.CARD_COLLECTION_SET:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.id]: action.payload,
        },
      }
    case CardCollectionActionTypesKeys.CARD_COLLECTION_DISPLAY_TYPE_SET:
      return {
        ...state,
        displayType: action.payload,
      }
    default:
      return { ...state }
  }
}

export default cardDatabaseState
