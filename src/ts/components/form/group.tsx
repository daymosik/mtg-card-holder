import { FunctionalComponent, h } from 'preact'

export interface FormGroupProps {
  label: string
}

export const FormGroup: FunctionalComponent<FormGroupProps> = ({ label, children }) => (
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">{label}</label>
    {children}
  </div>
)
