import { MagicSet, MagicSetType } from 'models/magic'
import { CardDatabaseActionsTypes, CardDatabaseActionTypesKeys } from 'store/actions-types/card-database-actions-types'

export const setTypes: MagicSetType[] = [
  MagicSetType.Core,
  MagicSetType.Un,
  MagicSetType.Promo,
  MagicSetType.Starter,
  MagicSetType.Planechase,
  MagicSetType.Masters,
  MagicSetType.Reprint,
  MagicSetType.BoardGameDeck,
  MagicSetType.FromTheVault,
  MagicSetType.DuelDeck,
  MagicSetType.Commander,
  MagicSetType.Expansion,
  MagicSetType.Box,
  MagicSetType.PremiumDeck,
  MagicSetType.Masterpiece,
  MagicSetType.Conspiracy,
  MagicSetType.Vanguard,
  MagicSetType.TwoHeadedGiant,
  MagicSetType.Archenemy,
]

export interface CardDatabaseState {
  sets: MagicSet[]
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
