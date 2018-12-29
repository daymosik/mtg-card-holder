import { h } from 'hyperapp'
import { FormInput } from './index'

export interface FormInputEmailProps {
  value: string,
  handleInputChange: any
}

export const FormInputEmail = ({value, handleInputChange}: FormInputEmailProps) => (
  <FormInput
    name={'email'}
    type={'text'}
    value={value}
    handleInputChange={handleInputChange}
  />
)
