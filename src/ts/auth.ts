import { AppState } from '@app'
import '@firebase-config'

export interface AuthState {
  authorized: boolean,
}

export const initialAuthState: AuthState = {
  authorized: false,
}

export interface AuthActions {
  authorize: (state: AppState, authorized: boolean) => AppState
}

export const authActions: AuthActions = {
  authorize: (state, authorized) => ({ ...state, auth: { ...state.auth, authorized } }),
}
