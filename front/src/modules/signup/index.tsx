import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import { AppActions, AppState } from '../../app'
import { NavigationPath } from '../../navigation'
import RegistrationService from '../../services/registration'

export interface SignupState {
  email: string
  password: string
  errorMessage: string
}

export const initialSignupState: SignupState = {
  email: '',
  password: '',
  errorMessage: '',
}

export interface SignupActions {
  handleInputChange: (object) => (state: SignupState) => SignupState
  submitForm: () => void
  handleSubmitError: (message: string) => (state: SignupState) => SignupState
}

export const signupActions: SignupActions = {
  handleInputChange: (object) => (state: SignupState): SignupState => ({ ...state, ...object }),
  submitForm: () => async (state: SignupState, actions: SignupActions) => {
    try {
      await RegistrationService.register(state)
    } catch (e) {
      actions.handleSubmitError(e.message)
    }
  },
  handleSubmitError: (message: string) => (state: SignupState): SignupState => ({ ...state, errorMessage: message }),
}

export const SignupView = (state: AppState, actions: AppActions) => () => (
  <div class="container pt-5">
    <div class="jumbotron">
      <form action="/">
        <h2>Register</h2>

        {state.signup.errorMessage && <p className="error-message">{state.signup.errorMessage}</p>}

        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="text"
            name="email"
            class="form-control"
            onkeyup={(event) => actions.signup.handleInputChange({ email: event.target.value })}
          />
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">Password</label>
          <input
            type="password"
            name="password"
            class="form-control"
            onkeyup={(event) => actions.signup.handleInputChange({ password: event.target.value })}
          />
        </div>

        <button class="btn btn-primary" type="button" onclick={actions.signup.submitForm}>
          Register
        </button>

        <div>
          Already have an account? <Link to={NavigationPath.Login}>Login</Link>.
        </div>
      </form>
    </div>
  </div>
)

export default SignupView
