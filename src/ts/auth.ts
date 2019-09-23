// import { mainActions } from '@app'
import '@firebase-config'
// import firebase = require('firebase/app')
// import 'firebase/auth'

// firebase.auth().onAuthStateChanged((user: firebase.User) => {
  // if (user) {
  //   mainActions.auth.authorize()
  // } else {
  //   mainActions.auth.unauthorize()
  // }
// })

export interface AuthState {
  authorized: boolean,
}

export const initialAuthState: AuthState = {
  // authorized: true,
  authorized: false,
}

export interface AuthActions {
  authorize: () => (state: AuthState) => AuthState
  unauthorize: () => (state: AuthState) => AuthState
}

export const authActions: AuthActions = {
  authorize: () => (state: AuthState): AuthState => ({ ...state, authorized: true }),
  unauthorize: () => (state: AuthState): AuthState => ({ ...state, authorized: false }),
}
