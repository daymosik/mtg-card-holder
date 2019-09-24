import { appActions, AppActions, AppState } from '@app'
import { AuthForm } from '@modules/auth/auth-form'
import LoginService from '@services/login'
import { NavigationPath } from '@slices/navigation'
import { h } from 'hyperapp'
import { Link } from '@services/location'

export interface LoginState {
  email: string
  password: string
  errorMessage: string
}

export const initialLoginState: LoginState = {
  email: '',
  password: '',
  errorMessage: '',
}

export interface LoginActions {
  handleInputChange: (state: AppState, object: { [key: string]: string }) => AppState
  submitForm: (state: AppState, event: Event) => void
  handleLoginSubmitError: (state: AppState, message: string) => AppState
}

export const loginActions: LoginActions = {
  handleInputChange: (state, object) => ({
    ...state,
    login: { ...state.login, ...object },
  }),
  submitForm: (state, event) => {
    event.preventDefault()

    const func = async (s) => {
      try {
        await LoginService.login(s.login.email, s.login.password)
        window.location.hash = '/'
      } catch (e) {
        appActions.login.handleLoginSubmitError(s, e.message)
      }
    }

    return [{ ...state }, func(state)]
  },
  handleLoginSubmitError: (state, message) => ({
    ...state,
    login: { ...state.login, errorMessage: message },
  }),
}

export const LoginView = (state: AppState) => (
  <div class="container pt-5">
    <h2>Login</h2>
    <AuthForm state={state.login} actions={appActions.login} buttonText={'Log In'}>
      <div>Don't have an account? <Link to={NavigationPath.Signup}>Create one</Link>.</div>
    </AuthForm>
  </div>
)

export default LoginView
