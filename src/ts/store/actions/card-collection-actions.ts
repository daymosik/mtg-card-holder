import { CardsDisplayType } from 'components/cards/cards-list-switcher'
import { getAuth } from 'firebase/auth'
import { ThunkAction } from 'redux-thunk'
import { Subscription } from 'rxjs'
import CardDatabaseService from 'services/card-database'
import {
  CardCollectionSetAction,
  CardCollectionActionTypesKeys,
  CardCollectionSetDisplayTypeAction,
} from 'store/actions-types/card-collection-actions-types'
import { UserMagicCard } from 'store/reducers/card-collection-reducers'
import { RootState } from 'store/reducers/root-reducers'

let USER_CARD_SUBSCRIBER: Subscription

export function getCardCollection(): ThunkAction<Promise<void>, RootState, null, CardCollectionSetAction> {
  return async (dispatch) => {
    const user = getAuth().currentUser

    if (!user || !!USER_CARD_SUBSCRIBER) {
      return Promise.reject(new Error(''))
    }

    // const a = await CardDatabaseService.getUserCards(user.uid)
    // await CardDatabaseService.getCards()

    USER_CARD_SUBSCRIBER = CardDatabaseService.userCardsSubscriber(user.uid).subscribe((value) => {
      dispatch(getCardCollectionSubmit(value))
    })
  }
}

export function getCardCollectionSubmit(card: UserMagicCard): CardCollectionSetAction {
  return { type: CardCollectionActionTypesKeys.CARD_COLLECTION_SET, payload: card }
}

export function setCardCollectionDisplayType(displayType: CardsDisplayType): CardCollectionSetDisplayTypeAction {
  return { type: CardCollectionActionTypesKeys.CARD_COLLECTION_DISPLAY_TYPE_SET, payload: displayType }
}
