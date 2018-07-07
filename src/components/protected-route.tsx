import { h } from 'hyperapp'
import { Route } from 'hyperapp-hash-router'
import { AppActions, AppState } from '../app'

const Unauthorized = () => (
  <div class="container">
    <h2 class="text-center">Unauthorized</h2>
  </div>
)

const isCurrentRoute = (path) => window.location.hash.includes(path)

export const ProtectedRoute = ({ path, render }) => (state: AppState, actions: AppActions) => {
  if (isCurrentRoute(path)) {
    return (state.auth.authorized)
      ? <Route path={path} render={render(state, actions)}/>
      : <Unauthorized/>
  }
  return null
}

export default ProtectedRoute
