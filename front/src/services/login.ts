import * as firebase from 'firebase'

class LoginService {

  public login = async (email: string, password: string): Promise<any> => {
    try {
      const data = await firebase.auth().signInWithEmailAndPassword(email, password)
      return data.user
    } catch (e) {
      return Promise.reject(e)
    }
  }

  public logout = async () => {
    try {
      firebase.auth().signOut()
      // tslint:disable-next-line:no-empty
    } catch (e) {
    }
  }
}

export default new LoginService()
