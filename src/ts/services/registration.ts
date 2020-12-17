import AuthService, { authType } from 'services/auth'

export class RegistrationService {
  public register = async (email: string, password: string): Promise<unknown> => {
    return AuthService.authenticate(email, password, authType.Register)
  }
}

export default new RegistrationService()
