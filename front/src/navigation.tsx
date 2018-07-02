import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import LoginService from './services/login'

export enum NavigationPath {
  Home = '/',
  Login = '/login',
  Signup = '/signup',
  CardDatabase = '/card-database',
  CardCollection = '/card-collection',
}

export const NavigationView = () => (
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">

      <Link class="navbar-brand" to="/">
        MTG Card Holder
      </Link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"/>
      </button>

      <div class="collapse navbar-collapse pull-right" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <Link class="nav-link" to={NavigationPath.Home}>Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={NavigationPath.CardDatabase}>Card Database</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={NavigationPath.CardCollection}>My Collection</Link>
          </li>
          {!LoginService.isAuthorized() &&
          <li class="nav-item">
            <Link class="nav-link" to={NavigationPath.Signup}>Signup</Link>
          </li>}
          {!LoginService.isAuthorized() &&
          <li class="nav-item">
            <Link class="nav-link" to={NavigationPath.Login}>Login</Link>
          </li>}
          {LoginService.isAuthorized() &&
          <li class="nav-item">
            <a class="nav-link" onclick={LoginService.logout}>Logout</a>
          </li>}
        </ul>
      </div>

    </div>
  </nav>
)

export default NavigationView
