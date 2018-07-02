import axios from 'axios'

import { RegisterRequestPayload, RegisterRequestResponse } from '../../../server/src/modules/Registration'

class Registration {
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

const RegistrationService = new Registration()

export default RegistrationService
