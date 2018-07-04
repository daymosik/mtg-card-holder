import axios from 'axios'

import { RegisterRequestPayload, RegisterRequestResponse } from '../../../server/src/modules/Registration'

class RegistrationService {
  public register = async (payload: RegisterRequestPayload) => {
    try {
      const response = await axios.post('/register', payload)
      const data: RegisterRequestResponse = response.data
      return data.user
    } catch (e) {
      const data: RegisterRequestResponse = e.response.data
      return Promise.reject(data)
    }
  }
}

export default new RegistrationService()
