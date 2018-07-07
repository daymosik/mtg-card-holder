import { h } from 'hyperapp'
import { AppActions, AppState } from '../../app'

export interface AddCardFormState {
  input: string
}

export const initialAddCardFormState = {
  input: '',
}

export interface AddCardFormActions {
  handleInputChange: () => (state: AddCardFormState) => AddCardFormState,
}

export const addCardFormActions = {
  handleInputChange: (value: string) => (state: AddCardFormState): AddCardFormState => {
    return { ...state, input: value }
  },
}

export const AddCardForm = () => (state: AppState, actions: AppActions) => {
  return (
    <div class="jumbotron" >
      <form>
        <input type="text" class="form-control"/>
      </form>
    </div>
  )
}

export default AddCardForm
