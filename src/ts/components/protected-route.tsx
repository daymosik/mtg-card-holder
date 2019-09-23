import { Route } from '@services/location'
import { h } from 'hyperapp'

const Unauthorized = () => (
  <div class="container">
    <h2 class="text-center">Unauthorized</h2>
  </div>
)

const isCurrentRoute = (path) => window.location.hash.includes(path)

// export const ProtectedRoute = (state, { path, render }) => {
export const ProtectedRoute = (props) => {
  if (isCurrentRoute(props.path)) {
    return (props.auth.authorized)
      ? <Route {...props} path={props.path} render={props.render}/>
      : <Unauthorized/>
  }
  return null
}

export default ProtectedRoute
