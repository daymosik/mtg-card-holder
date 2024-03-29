import { ScrySet } from 'models/magic'

export enum CardDatabaseActionTypesKeys {
  CARD_DATABASE_SET_SETS = 'CARD_DATABASE_SET_SETS',
}

export interface CardDatabaseSetSetsAction {
  type: CardDatabaseActionTypesKeys.CARD_DATABASE_SET_SETS
  payload: ScrySet[]
}

export type CardDatabaseActionsTypes = CardDatabaseSetSetsAction
