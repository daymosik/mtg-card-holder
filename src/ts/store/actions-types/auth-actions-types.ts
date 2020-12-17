export enum AuthActionTypesKeys {
  SET_AUTH_STATUS = 'SET_AUTH_STATUS',
}

export interface SetAuthStatusAction {
  type: AuthActionTypesKeys.SET_AUTH_STATUS
  payload: boolean
}

export type AuthActionsTypes = SetAuthStatusAction
