import firebase = require('firebase/app')
import 'firebase/auth'
import AuthService, { authType } from './auth'

class LoginService {
  public login = async (email: string, password: string): Promise<any> => {
    return AuthService.authenticate(email, password, authType.Login)
  }

  public logout = async () => {
    try {
      firebase.auth().signOut()
      window.location.reload()
      // tslint:disable-next-line:no-empty
    } catch (e) {
    }
  }
}

export default new LoginService()
