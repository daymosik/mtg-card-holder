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
    <div className="container pt-5">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark bg-opacity-75 text-white rounded-3">
            <div className="card-body p-5">
              <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
              <p className="text-white-50 mb-5">Please enter your login and password to create account!</p>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupView
