import { FunctionalComponent, h } from 'preact'
import { FormInput } from './index'

export interface FormInputEmailProps {
  value: string
  handleInputChange: (value: string) => void
}

export const FormInputEmail: FunctionalComponent<FormInputEmailProps> = ({ value, handleInputChange }) => (
  <FormInput name={'email'} type={'text'} value={value} handleInputChange={handleInputChange} />
)
