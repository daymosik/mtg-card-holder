import axios from 'axios'

import { LoginRequestPayload, LoginRequestResponse } from '../../../server/src/modules/Login'
import { User } from '../../../server/src/modules/User'

class Login {
  private authorized: boolean = false

  public authorize = (): void => {
    this.authorized = true
  }

  public unauthorize = (): void => {
    this.authorized = false
  }

  public isAuthorized = (): boolean => this.authorized

  public checkLogin = async (): Promise<User> => {
    try {
      const response = await axios.get('/check-login')
      this.authorize()
      return response.data
    } catch (e) {
      return Promise.reject(e)
    }
  }

  public login = async (payload: LoginRequestPayload): Promise<User> => {
    try {
      const response = await axios.post('/login', payload)
      const data: LoginRequestResponse = response.data
      this.authorize()
      return data.user
    } catch (e) {
      const data: LoginRequestResponse = e.response.data
      this.unauthorize()
      return Promise.reject(data)
    }
  }

  public logout = async () => {
    try {
      await axios.post('/logout')
      window.location.reload()
      // tslint:disable-next-line:no-empty
    } catch (e) {
    }
  }
}

const LoginService = new Login()

export default LoginService
