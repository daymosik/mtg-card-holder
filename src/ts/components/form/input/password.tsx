import { FunctionalComponent, h } from 'preact'
import { FormInput } from './index'

export interface FormInputPasswordProps {
  value: string
  handleInputChange: (value: string) => void
}

export const FormInputPassword: FunctionalComponent<FormInputPasswordProps> = ({ value, handleInputChange }) => (
  <FormInput name={'password'} type={'password'} value={value} handleInputChange={handleInputChange} />
)
