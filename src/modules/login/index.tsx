import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import { AppActions, AppState } from '../../app'
import { NavigationPath } from '../../navigation'
import LoginService from '../../services/login'

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
  handleSubmitError: (message: string) => (state: LoginState) => LoginState
}

export const loginActions: LoginActions = {
  handleInputChange: (object) => (state: LoginState): LoginState => ({ ...state, ...object }),
  submitForm: (event: Event) => async (state: LoginState, actions: LoginActions) => {
    event.preventDefault()
    try {
      await LoginService.login(state.email, state.password)
    } catch (e) {
      actions.handleSubmitError(e.message)
    }
  },
  handleSubmitError: (message: string) => (state: LoginState): LoginState => ({ ...state, errorMessage: message }),
}

export const LoginView = (state: AppState, actions: AppActions) => () => (
  <div class="container pt-5">
    <form action="/" onsubmit={actions.login.submitForm}>
      <h2>Login</h2>

      {state.login.errorMessage && <p className="error-message">{state.login.errorMessage}</p>}

      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="text"
          name="email"
          class="form-control"
          onkeyup={(event) => actions.login.handleInputChange({ email: event.target.value })}
        />
      </div>

      <div class="form-group">
        <label for="exampleInputEmail1">Password</label>
        <input
          type="password"
          name="password"
          class="form-control"
          onkeyup={(event) => actions.login.handleInputChange({ password: event.target.value })}
        />
      </div>

      <button class="btn btn-primary" type="submit">
        Log In
      </button>

      <div>
        Don't have an account? <Link to={NavigationPath.Signup}>Create one</Link>.
      </div>
    </form>
  </div>
)

export default LoginView
