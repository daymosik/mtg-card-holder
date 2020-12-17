import { FormGroup } from 'components/form'
import { FormInputEmail, FormInputPassword } from 'components/form/input/index'
import { FunctionalComponent, h } from 'preact'
import { JSXInternal } from 'preact/src/jsx'

export interface AuthFormProps {
  buttonText: string
  email: string
  password: string
  errorMessage: string
  submitForm: JSXInternal.GenericEventHandler<HTMLFormElement>
  handleEmail: (value: string) => void
  handlePassword: (value: string) => void
}

export const AuthForm: FunctionalComponent<AuthFormProps> = ({
  buttonText,
  handleEmail,
  handlePassword,
  submitForm,
  email,
  password,
  errorMessage,
  children,
}) => {
  return (
    <form action="/" onSubmit={submitForm}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <FormGroup label={'Email address'}>
        <FormInputEmail value={email} handleInputChange={handleEmail} />
      </FormGroup>
      <FormGroup label={'Password'}>
        <FormInputPassword value={password} handleInputChange={handlePassword} />
      </FormGroup>
      <button class="btn btn-primary" type="submit">
        {buttonText}
      </button>
      {children}
    </form>
  )
}
