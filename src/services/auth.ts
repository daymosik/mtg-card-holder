import * as firebase from 'firebase'

export enum authType {
  Login = 'login',
  Register = 'register',
}

class Auth {
  public authenticate = async (email: string, password: string, type: authType): Promise<any> => {
    const data = type === authType.Login
      ? await firebase.auth().signInWithEmailAndPassword(email, password)
      : await firebase.auth().createUserWithEmailAndPassword(email, password)
    return data.user
  }
}

const AuthService = new Auth()

export default AuthService
