import { NavigationPath } from 'models/routes'
import { AuthForm } from 'modules/auth/auth-form'
import { useState } from 'preact/hooks'
import { JSXInternal } from 'preact/src/jsx'
import RegistrationService from 'services/registration'
import { FunctionalComponent, h } from 'preact'
import { Link } from 'preact-router'

export const SignupView: FunctionalComponent = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleEmail = (value: string) => setEmail(value)
  const handlePassword = (value: string) => setPassword(value)

  const submitForm = async (event: JSXInternal.TargetedEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await RegistrationService.register(email, password)
      window.location.hash = '/'
    } catch (e) {
      console.info(e)
      // TODO: as
      setErrorMessage(e ? (e as Error).message : '')
    }
  }

  return (
    <div class="container pt-5">
      <h2>Register</h2>
      <AuthForm
        email={email}
        password={password}
        submitForm={submitForm}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        errorMessage={errorMessage}
        buttonText={'Register'}
      >
        <div>
          Already have an account? <Link href={NavigationPath.Login}>Login</Link>.
        </div>
      </AuthForm>
    </div>
  )
}

export default SignupView
