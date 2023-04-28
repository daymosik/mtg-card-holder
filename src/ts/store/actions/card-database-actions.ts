import { ScrySet } from 'models/magic'
import { ThunkAction } from 'redux-thunk'
import CardDatabaseService from 'services/card-database'
import { CardDatabaseActionTypesKeys, CardDatabaseSetSetsAction } from 'store/actions-types/card-database-actions-types'
import { RootState } from 'store/reducers/root-reducers'

export function getCardDatabaseSets(): ThunkAction<Promise<ScrySet[]>, RootState, null, CardDatabaseSetSetsAction> {
  return async (dispatch) => {
    const sets = await CardDatabaseService.getSets()
    dispatch(getCardDatabaseSetsSubmit(sets))
    return sets
  }
}

export function getCardDatabaseSetsSubmit(sets: ScrySet[]): CardDatabaseSetSetsAction {
  return { type: CardDatabaseActionTypesKeys.CARD_DATABASE_SET_SETS, payload: sets }
}
