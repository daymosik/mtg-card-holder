import { combineReducers, Reducer } from 'redux'
import { AuthActionsTypes } from 'store/actions-types/auth-actions-types'
import { CardCollectionActionsTypes } from 'store/actions-types/card-collection-actions-types'
import { CardDatabaseActionsTypes } from 'store/actions-types/card-database-actions-types'
import authState, { AuthState } from 'store/reducers/auth-reducers'
import cardCollectionState, { CardCollectionState } from 'store/reducers/card-collection-reducers'
import cardDatabaseState, { CardDatabaseState } from 'store/reducers/card-database-reducers'

export interface RootState {
  authState: AuthState
  cardDatabaseState: CardDatabaseState
  cardCollectionState: CardCollectionState
}

export type RootActions = CardDatabaseActionsTypes | CardCollectionActionsTypes | AuthActionsTypes

const rootReducer: Reducer<RootState, RootActions> = combineReducers({
  authState,
  cardDatabaseState,
  cardCollectionState,
})

export default rootReducer
