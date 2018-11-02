import { h } from 'hyperapp'
import { AppActions, AppState } from '../../app'

export const AdminView = (state: AppState, actions: AppActions) => () => (
  <div class="container">
    <h2>Administration</h2>
  </div>
)

export default AdminView
