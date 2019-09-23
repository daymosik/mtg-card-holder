import { appActions, AppState } from '@app'
import { Link } from '@services/location'
import LoginService from '@services/login'
import { h } from 'hyperapp'

export enum NavigationPath {
  Home = '',
  Login = 'login',
  Signup = 'signup',
  CardDatabase = 'card-database',
  CardCollection = 'card-collection',
  Admin = 'admin',
}

export interface NavigationState {
  mobileMenuOpen: boolean
}

export const initialNavigationState: NavigationState = {
  mobileMenuOpen: false,
}

export interface NavigationActions {
  toggleMobileMenu: (state: AppState) => AppState
  hideMobileMenu: (state: AppState) => AppState
}

export const navigationAgtions: NavigationActions = {
  toggleMobileMenu: (state: AppState): AppState => (
    { ...state, nav: { ...state.nav, mobileMenuOpen: !state.nav.mobileMenuOpen } }
  ),
  hideMobileMenu: (state: AppState): AppState => (
    { ...state, nav: { ...state.nav, mobileMenuOpen: false } }
  ),
}

interface NavigationButtonProps {
  onclick: (state) => AppState
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
    onclick={(state) => onclick(state)}
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
  hideMobileMenu: (state: AppState) => AppState
  authorized: boolean
}

const NavigationMenu = ({ mobileMenuOpen, hideMobileMenu, authorized }: NavigationMenuProps) => (
  <div
    class={`collapse navbar-collapse pull-right ${mobileMenuOpen ? 'show' : ''}`}
    id="navbarSupportedContent"
    onclick={(state) => hideMobileMenu(state)}
  >
    <ul class="navbar-nav mr-auto">
      <NavigationListItem path={NavigationPath.CardDatabase} name={'Card Database'}/>
      <NavigationListItem path={NavigationPath.CardCollection} name={'My Collection'}/>
      <NavigationListItem path={NavigationPath.Admin} name={'Admin'}/>
    </ul>
    <ul class="navbar-nav">
      {!authorized && <NavigationListItem path={NavigationPath.Signup} name={'Signup'}/>}
      {!authorized && <NavigationListItem path={NavigationPath.Login} name={'Login'}/>}
      {authorized && <NavigationListItem onclick={LoginService.logout} name={'Logout'}/>}
    </ul>
  </div>
)

export const NavigationView = (state: AppState) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <NavigationButton onclick={(s) => appActions.nav.toggleMobileMenu(s)}/>

        <Link to="/">
          <div class="navbar-brand" alt="MTG Card Holder"/>
        </Link>

        <NavigationMenu
          mobileMenuOpen={state.nav.mobileMenuOpen}
          hideMobileMenu={appActions.nav.hideMobileMenu}
          authorized={state.auth.authorized}
        />
      </div>
    </nav>
  )
}

export default NavigationView
