import { NavigationPath } from 'models/routes'
import { AuthForm } from 'modules/auth/auth-form'
import { useState } from 'preact/hooks'
import { JSXInternal } from 'preact/src/jsx'
import { useDispatch } from 'react-redux'
import LoginService from 'services/login'
import { FunctionalComponent, h } from 'preact'
import { Link } from 'preact-router'
import { setAuthStatus } from 'store/actions/auth-actions'

export const LoginView: FunctionalComponent = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleEmail = (value: string) => setEmail(value)
  const handlePassword = (value: string) => setPassword(value)

  const submitForm = async (event: JSXInternal.TargetedEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await LoginService.login(email, password)
      dispatch(setAuthStatus(true))
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
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <AuthForm
                email={email}
                password={password}
                submitForm={submitForm}
                handleEmail={handleEmail}
                handlePassword={handlePassword}
                errorMessage={errorMessage}
                buttonText={'Log In'}
              >
                <div>
                  Don&apos;t have an account? <Link href={NavigationPath.Signup}>Create one</Link>.
                </div>
              </AuthForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginView
