import axios from 'axios'
import { mainActions } from '../app'
import LoginService from '../services/login'

axios.interceptors.response.use((response) => {
  mainActions.auth.authorize()
  LoginService.authorize()
  return response
}, (error) => {
  if (401 === error.response.status) {
    mainActions.auth.unauthorize()
    LoginService.unauthorize()
  }
  return Promise.reject(error)
})
