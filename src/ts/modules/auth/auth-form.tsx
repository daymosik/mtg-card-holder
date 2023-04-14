import { FormGroup } from 'components/form'
import { FormInputEmail, FormInputPassword } from 'components/form/input'
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
      <div className="mb-3">
        <FormGroup label={'Email address'}>
          <FormInputEmail value={email} handleInputChange={handleEmail} />
        </FormGroup>
      </div>
      <div className="mb-3">
        <FormGroup label={'Password'}>
          <FormInputPassword value={password} handleInputChange={handlePassword} />
        </FormGroup>
      </div>
      <div className="d-grid gap-2 mb-3">
        <button className="btn btn-primary btn-lg btn-block" type="submit">
          {buttonText}
        </button>
      </div>
      {children}
    </form>
  )
}
