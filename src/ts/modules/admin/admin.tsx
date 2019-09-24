import { appActions, AppActions, AppState } from '@app'
import { FormGroup } from '@components/form'
import MtgApiService from '@services/mtg-api'
import { h } from 'hyperapp'

export interface AdminState {
  errorMessage: string
}

export const initialAdminState: AdminState = {
  errorMessage: '',
}

export interface AdminActions {
  setErrorMessage: (state: AppState, message: string) => AppState
  importSets: () => void
  importCards: () => void
}

export const adminActions: AdminActions = {
  setErrorMessage: (state, message) => ({
    ...state,
    admin: {
      ...state.admin,
      errorMessage: message,
    },
  }),
  importSets: () => MtgApiService.importSets(),
  importCards: () => MtgApiService.importCards(),
}

export const AdminView = (state: AppState) => (
  <div class="container">
    <h2>Administration</h2>

    <form onsubmit={(e) => e.preventDefault()}>
      {state.admin.errorMessage && <p className="error-message">{state.admin.errorMessage}</p>}
      <FormGroup label={'Import sets'}>
        <button class="btn btn-primary form-control" onclick={appActions.admin.importSets}>Import</button>
      </FormGroup>

      <FormGroup label={'Import cards'}>
        <button class="btn btn-primary form-control" onclick={appActions.admin.importCards}>Import</button>
      </FormGroup>
    </form>

  </div>
)

export default AdminView
