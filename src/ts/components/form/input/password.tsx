import { h } from 'hyperapp'
import { FormInput } from './index'

export interface FormInputPasswordProps {
  value: string,
  handleInputChange: any
}

export const FormInputPassword = ({value, handleInputChange}: FormInputPasswordProps) => (
  <FormInput
    name={'password'}
    type={'password'}
    value={value}
    handleInputChange={handleInputChange}
  />
)
