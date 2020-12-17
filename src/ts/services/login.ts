import AuthService, { authType } from 'services/auth'
import firebase from 'firebase/app'
import 'firebase/auth'

export class LoginService {
  public login = async (email: string, password: string): Promise<unknown> => {
    return AuthService.authenticate(email, password, authType.Login)
  }

  public logout = async (): Promise<void> => {
    try {
      await firebase.auth().signOut()
      window.location.reload()
    } catch (e) {
      console.info(e)
    }
  }
}

export default new LoginService()
