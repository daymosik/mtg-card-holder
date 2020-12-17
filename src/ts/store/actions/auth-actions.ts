import { AuthActionTypesKeys, SetAuthStatusAction } from 'store/actions-types/auth-actions-types'

export function setAuthStatus(isAuthenticated: boolean): SetAuthStatusAction {
  return { type: AuthActionTypesKeys.SET_AUTH_STATUS, payload: isAuthenticated }
}
