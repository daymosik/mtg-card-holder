import { ScrySet } from 'models/magic'
import { CardDatabaseActionsTypes, CardDatabaseActionTypesKeys } from 'store/actions-types/card-database-actions-types'

export interface CardDatabaseState {
  sets: ScrySet[]
}

const initialState: CardDatabaseState = {
  sets: [],
}

const cardDatabaseState = (
  state: CardDatabaseState = initialState,
  action: CardDatabaseActionsTypes,
): CardDatabaseState => {
  switch (action.type) {
    case CardDatabaseActionTypesKeys.CARD_DATABASE_SET_SETS:
      return { ...state, sets: action.payload }
    default:
      return { ...state }
  }
}

export default cardDatabaseState
