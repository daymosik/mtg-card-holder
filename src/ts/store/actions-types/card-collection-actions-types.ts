import { CardsDisplayType } from 'components/cards/cards-list-switcher'
import { UserMagicCard } from 'store/reducers/card-collection-reducers'

export enum CardCollectionActionTypesKeys {
  CARD_COLLECTION_SET = 'CARD_COLLECTION_SET',
  CARD_COLLECTION_DISPLAY_TYPE_SET = 'CARD_COLLECTION_DISPLAY_TYPE_SET',
}

export interface CardCollectionSetAction {
  type: CardCollectionActionTypesKeys.CARD_COLLECTION_SET
  payload: UserMagicCard
}

export interface CardCollectionSetDisplayTypeAction {
  type: CardCollectionActionTypesKeys.CARD_COLLECTION_DISPLAY_TYPE_SET
  payload: CardsDisplayType
}

export type CardCollectionActionsTypes = CardCollectionSetAction | CardCollectionSetDisplayTypeAction
