import AuthService, { authType } from '@services/auth'
import firebase = require('firebase/app')
import 'firebase/auth'

export class LoginService {
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
