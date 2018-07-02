import 'bootstrap/scss/bootstrap.scss'
import { ActionsType, app, h, View } from 'hyperapp'
import { Link, location, Route } from 'hyperapp-hash-router'

import './config/axios'

import CardCollectionView from './modules/card-collection'
import CardDatabaseView from './modules/card-database'
import LoginView, { initialLoginState, LoginActions, loginActions, LoginState } from './modules/login'
import SignupView, { initialSignupState, signupActions, SignupActions, SignupState } from './modules/signup'
import NavigationView, { NavigationPath } from './navigation'

import LoginService from './services/login'

// TODO: where should it be initialized ?
LoginService.checkLogin()

interface AuthActions {
  authorize: () => (state: AppState) => AppState
  unauthorize: () => (state: AppState) => AppState
}

const authActions: AuthActions = {
  authorize: () => (state: AppState): AppState => ({ ...state, authorized: true }),
  unauthorize: () => (state: AppState): AppState => ({ ...state, authorized: false }),
}

export interface AppState {
  location: location.state
  authorized: boolean
  login: LoginState
  signup: SignupState
}

const initialState: AppState = {
  location: location.state,
  authorized: false,
  login: initialLoginState,
  signup: initialSignupState,
}

export interface AppActions {
  location: location.actions
  auth: AuthActions,
  login: LoginActions,
  signup: SignupActions
}

const appActions: ActionsType<AppState, AppActions> = {
  location: location.actions,
  auth: authActions,
  login: loginActions,
  signup: signupActions,
}

const Home = () => <div></div>

const view: View<AppState, AppActions> = (state, actions) => (
  <div>
    <NavigationView/>
    <Route path={NavigationPath.Home} render={Home}/>
    <Route path={NavigationPath.Login} render={LoginView(state, actions)}/>
    <Route path={NavigationPath.Signup} render={SignupView(state, actions)}/>
    <Route path={NavigationPath.CardDatabase} render={CardDatabaseView}/>
    <Route path={NavigationPath.CardCollection} render={CardCollectionView}/>
  </div>
)

export const mainActions = app(initialState, appActions, view, document.body)

const unsubscribe = location.subscribe(mainActions.location)
