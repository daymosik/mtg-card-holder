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

interface NavigationButtonProps {
  onclick: () => void
}

const NavigationButton = ({ onclick }: NavigationButtonProps) => (
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
    onclick={() => onclick()}
  >
    <span class="navbar-toggler-icon"/>
  </button>
)

interface NavigationListItemProps {
  name: string
  path?: string
  onclick?: () => void
}

const NavigationListItem = ({ path, name, onclick }: NavigationListItemProps) => (
  <li class="nav-item">
    {path && <Link class="nav-link" to={path}>{name}</Link>}
    {onclick && <a class="nav-link" onclick={() => onclick()}>{name}</a>}
  </li>
)

interface NavigationMenuProps {
  mobileMenuOpen: boolean
  hideMobileMenu: () => void
  authorized: boolean
}

const NavigationMenu = ({ mobileMenuOpen, hideMobileMenu, authorized }: NavigationMenuProps) => (
  <div
    class={`collapse navbar-collapse pull-right ${mobileMenuOpen ? 'show' : ''}`}
    id="navbarSupportedContent"
    onclick={() => hideMobileMenu()}
  >
    <ul class="navbar-nav mr-auto">
      <NavigationListItem path={NavigationPath.CardDatabase} name={'Card Database'}/>
      <NavigationListItem path={NavigationPath.CardCollection} name={'My Collection'}/>
    </ul>
    <ul class="navbar-nav">
      {!authorized && <NavigationListItem path={NavigationPath.Signup} name={'Signup'}/>}
      {!authorized && <NavigationListItem path={NavigationPath.Login} name={'Login'}/>}
      {authorized && <NavigationListItem onclick={LoginService.logout} name={'Logout'}/>}
    </ul>
  </div>
)

export const NavigationView = () => (state: AppState, actions: AppActions) => (
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <NavigationButton onclick={() => actions.nav.toggleMobileMenu()}/>

      <Link class="navbar-brand" to="/" alt="MTG Card Holder"/>

      <NavigationMenu
        mobileMenuOpen={state.nav.mobileMenuOpen}
        hideMobileMenu={actions.nav.hideMobileMenu}
        authorized={state.auth.authorized}
      />
    </div>
  </nav>
)

export default NavigationView
