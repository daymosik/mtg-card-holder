import * as firebase from 'firebase'

class RegistrationService {
  public register = async (email: string, password: string) => {
    try {
      const data = await firebase.auth().createUserWithEmailAndPassword(email, password)
      return data.user
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

export default new RegistrationService()
