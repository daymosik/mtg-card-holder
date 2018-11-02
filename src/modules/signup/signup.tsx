import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import { AppActions, AppState } from '../../app'
import { NavigationPath } from '../../slices/navigation'
import RegistrationService from '../../services/registration'
import { AuthForm } from '../auth/auth-form'

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
  submitForm: (event: Event) => (state: SignupState, actions: SignupActions) => void
  handleSignupSubmitError: (message: string) => (state: SignupState) => SignupState
}

export const signupActions: SignupActions = {
  handleInputChange: (object) => (state: SignupState): SignupState => ({ ...state, ...object }),
  submitForm: (event: Event) => async (state: SignupState, actions: SignupActions) => {
    event.preventDefault()
    try {
      await RegistrationService.register(state.email, state.password)
      window.location.hash = '/'
    } catch (e) {
      actions.handleSignupSubmitError(e.message)
    }
  },
  handleSignupSubmitError: (message: string) => (state: SignupState): SignupState => ({
    ...state,
    errorMessage: message,
  }),
}

export const SignupView = (state: AppState, actions: AppActions) => () => (
  <div class="container pt-5">
    <h2>Register</h2>
    <AuthForm state={state.signup} actions={actions.signup} buttonText={'Register'}>
      <div>Already have an account? <Link to={NavigationPath.Login}>Login</Link>.</div>
    </AuthForm>
  </div>
)

export default SignupView
