import * as User from './User'

export interface LoginRequestPayload {
  email: string,
  password: string,
}

export interface LoginRequestResponse {
  success: boolean,
  message?: string,
  errors?: {
    email: string,
    password: string,
  },
  user?: any
}

export function validateLoginForm(payload: LoginRequestPayload): LoginRequestResponse {
  const errors = {
    email: '',
    password: '',
  }
  let isFormValid = true
  let message = ''
  let user

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false
    errors.email = 'Please provide your email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false
    errors.password = 'Please provide your password.'
  }

  if (isFormValid) {
    user = User.getUserByEmail(payload.email) || null
    if (user) {
      const validPasword = User.checkPassword(user.id, payload.password)
      if (!validPasword) {
        message = 'Password invalid'
        errors.password = 'Password invalid'
        isFormValid = false
      }
    } else {
      message = 'No user'
      isFormValid = false
    }
  } else {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors,
    user,
  }
}
