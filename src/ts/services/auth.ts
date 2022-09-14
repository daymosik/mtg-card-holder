import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export enum authType {
  Login = 'login',
  Register = 'register',
}

export class Auth {
  public authenticate = async (email: string, password: string, type: authType): Promise<unknown> => {
    const auth = getAuth()

    const data =
      type === authType.Login
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password)
    return data.user
  }
}

const AuthService = new Auth()

export default AuthService
