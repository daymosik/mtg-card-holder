import * as User from './User'

export interface RegisterRequestPayload {
  email: string,
  password: string,
}

export interface RegisterRequestResponse {
  success: boolean,
  message?: string,
  errors?: {
    email: string,
    password: string,
  },
  user?: any
}

export function validateRegistrationForm(payload: RegisterRequestPayload): RegisterRequestResponse {
  const errors = {
    email: '',
    password: '',
  }
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false
    errors.email = 'Please provide your email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false
    errors.password = 'Please provide your password.'
  }

  if (isFormValid) {
    const user = User.getUserByEmail(payload.email) || null
    if (user) {
      message = 'User already registered'
      isFormValid = false
    }
  } else {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors,
  }
}
