import AuthService, { authType } from 'services/auth'
import { getAuth } from 'firebase/auth'

export class LoginService {
  public login = async (email: string, password: string): Promise<unknown> => {
    return AuthService.authenticate(email, password, authType.Login)
  }

  public logout = async (): Promise<void> => {
    try {
      await getAuth().signOut()
      window.location.reload()
    } catch (e) {
      console.info(e)
    }
  }
}

export default new LoginService()
