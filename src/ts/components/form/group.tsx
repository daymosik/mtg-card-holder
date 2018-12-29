import { h } from 'hyperapp'

export interface FormGroupProps {
  label: string
}

export const FormGroup = ({ label }: FormGroupProps, children) => (
  <div class="form-group">
    <label for="exampleInputEmail1">{label}</label>
    {children}
  </div>
)
