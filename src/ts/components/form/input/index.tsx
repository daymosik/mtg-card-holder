import { FunctionalComponent, h } from 'preact'
import { FormInputEmail } from './email'
import { FormInputPassword } from './password'

export interface FormInputProps {
  name: string
  value: string
  type: string
  handleInputChange: (value: string) => void
}

const FormInput: FunctionalComponent<FormInputProps> = ({ name, type, value, handleInputChange }) => (
  <input
    className="form-control"
    type={type}
    name={name}
    value={value}
    onInput={(event) => handleInputChange((event.target as HTMLInputElement).value)}
  />
)

export { FormInput, FormInputEmail, FormInputPassword }
