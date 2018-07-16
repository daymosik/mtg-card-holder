import AuthService, { authType } from './auth'

class RegistrationService {
  public register = async (email: string, password: string): Promise<any> => {
    return AuthService.authenticate(email, password, authType.Register)
  }
}

export default new RegistrationService()
