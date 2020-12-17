import { AuthActionsTypes, AuthActionTypesKeys } from 'store/actions-types/auth-actions-types'

export interface AuthState {
  isAuthenticationSet: boolean
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticationSet: false,
  isAuthenticated: false,
}

const authState = (state: AuthState = initialState, action: AuthActionsTypes): AuthState => {
  switch (action.type) {
    case AuthActionTypesKeys.SET_AUTH_STATUS:
      return { ...state, isAuthenticated: action.payload, isAuthenticationSet: true }
    default:
      return { ...state }
  }
}

export default authState
