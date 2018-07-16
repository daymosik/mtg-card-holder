import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import { AppActions, AppState } from '../../app'
import { NavigationPath } from '../../navigation'
import LoginService from '../../services/login'
import { AuthForm } from '../auth/auth-form'

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
  handleInputChange: (object) => (state: LoginState) => LoginState
  submitForm: (event: Event) => (state: LoginState, actions: LoginActions) => void
  handleLoginSubmitError: (message: string) => (state: LoginState) => LoginState
}

export const loginActions: LoginActions = {
  handleInputChange: (object) => (state: LoginState): LoginState => ({ ...state, ...object }),
  submitForm: (event: Event) => async (state: LoginState, actions: LoginActions) => {
    event.preventDefault()
    try {
      await LoginService.login(state.email, state.password)
      window.location.hash = '/'
    } catch (e) {
      actions.handleLoginSubmitError(e.message)
    }
  },
  handleLoginSubmitError: (message: string) => (state: LoginState): LoginState => ({ ...state, errorMessage: message }),
}

export const LoginView = (state: AppState, actions: AppActions) => () => (
  <div class="container pt-5">
    <h2>Login</h2>
    <AuthForm state={state.login} actions={actions.login} buttonText={'Log In'}>
      <div>Don't have an account? <Link to={NavigationPath.Signup}>Create one</Link>.</div>
    </AuthForm>
  </div>
)

export default LoginView
