import { MagicSet } from 'models/magic'
import { ThunkAction } from 'redux-thunk'
import CardDatabaseService from 'services/card-database'
import { CardDatabaseActionTypesKeys, CardDatabaseSetSetsAction } from 'store/actions-types/card-database-actions-types'
import { RootState } from 'store/reducers/root-reducers'

export function getCardDatabaseSets(): ThunkAction<Promise<MagicSet[]>, RootState, null, CardDatabaseSetSetsAction> {
  return async (dispatch) => {
    const sets: MagicSet[] = await CardDatabaseService.getSets()
    dispatch(getCardDatabaseSetsSubmit(sets))
    return sets
  }
}

export function getCardDatabaseSetsSubmit(sets: MagicSet[]): CardDatabaseSetSetsAction {
  return { type: CardDatabaseActionTypesKeys.CARD_DATABASE_SET_SETS, payload: sets }
}
