import { h } from 'hyperapp'

import { FormInputEmail } from './email'
import { FormInputPassword } from './password'

export interface FormInputProps {
  name: string,
  value: string
  type: string,
  // TODO
  handleInputChange: any,
}

const FormInput = ({ name, type, value, handleInputChange }: FormInputProps) => (
  <input
    class="form-control"
    type={type}
    name={name}
    value={value}
    onkeyup={(event) => handleInputChange({ [name]: event.target.value })}
  />
)

export {
  FormInput,
  FormInputEmail,
  FormInputPassword,
}
