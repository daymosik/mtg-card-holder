import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import { AppActions, AppState } from './app'
import LoginService from './services/login'

export enum NavigationPath {
  Home = '/',
  Login = '/login',
  Signup = '/signup',
  CardDatabase = '/card-database',
  CardCollection = '/card-collection',
}

export interface NavigationState {
  mobileMenuOpen: boolean
}

export const initialNavigationState: NavigationState = {
  mobileMenuOpen: false,
}

export interface NavigationActions {
  toggleMobileMenu: () => (state: NavigationState) => NavigationState
  hideMobileMenu: () => (state: NavigationState) => NavigationState
}

export const navigationAgtions: NavigationActions = {
  toggleMobileMenu: () => (state: NavigationState): NavigationState => (
    { ...state, mobileMenuOpen: !state.mobileMenuOpen }
  ),
  hideMobileMenu: () => (state: NavigationState): NavigationState => (
    { ...state, mobileMenuOpen: false }
  ),
}

export const NavigationView = () => (state: AppState, actions: AppActions) => (
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onclick={() => actions.nav.toggleMobileMenu()}
      >
        <span class="navbar-toggler-icon"/>
      </button>

      <Link class="navbar-brand" to="/" alt="MTG Card Holder"></Link>

      <div
        class={`collapse navbar-collapse pull-right ${state.nav.mobileMenuOpen ? 'show' : ''}`}
        id="navbarSupportedContent"
        onclick={() => actions.nav.hideMobileMenu()}
      >
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <Link class="nav-link" to={NavigationPath.CardDatabase}>Card Database</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to={NavigationPath.CardCollection}>My Collection</Link>
          </li>
        </ul>
        <ul class="navbar-nav">
          {!state.auth.authorized &&
          <li class="nav-item">
            <Link class="nav-link" to={NavigationPath.Signup}>Signup</Link>
          </li>}
          {!state.auth.authorized &&
          <li class="nav-item">
            <Link class="nav-link" to={NavigationPath.Login}>Login</Link>
          </li>}
          {state.auth.authorized &&
          <li class="nav-item flex">
            <a class="nav-link" onclick={LoginService.logout}>Logout</a>
          </li>}
        </ul>
      </div>

    </div>
  </nav>
)

export default NavigationView
