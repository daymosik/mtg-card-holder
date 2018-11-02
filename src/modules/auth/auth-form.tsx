import { h } from 'hyperapp'
import { FormGroup } from '../../components/form'
import { FormInputEmail, FormInputPassword } from '../../components/form/input'

import { LoginActions, LoginState } from '../login/login'
import { SignupActions, SignupState } from '../signup/signup'

export interface AuthFormProps {
  state: LoginState | SignupState
  actions: LoginActions | SignupActions
  buttonText: string
}

export const AuthForm = ({ state, actions, buttonText }: AuthFormProps, children) => (
  <form action="/" onsubmit={actions.submitForm}>
    {state.errorMessage && <p className="error-message">{state.errorMessage}</p>}
    <FormGroup label={'Email address'}>
      <FormInputEmail value={state.email} handleInputChange={actions.handleInputChange}/>
    </FormGroup>
    <FormGroup label={'Password'}>
      <FormInputPassword value={state.password} handleInputChange={actions.handleInputChange}/>
    </FormGroup>
    <button class="btn btn-primary" type="submit">{buttonText}</button>
    {children}
  </form>
)
