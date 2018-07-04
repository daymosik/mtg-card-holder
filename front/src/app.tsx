import 'bootstrap/scss/bootstrap.scss'
import { ActionsType, app, h, View } from 'hyperapp'
import { Link, location, Route } from 'hyperapp-hash-router'

import './config/axios'

import CardCollectionView from './modules/card-collection'
import CardDatabaseView, {
  cardDatabaseActions,
  CardDatabaseActions, CardDatabaseState,
  initialCardDatabaseState,
} from './modules/card-database'
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
  cardDatabase: CardDatabaseState
}

const initialState: AppState = {
  location: location.state,
  authorized: false,
  login: initialLoginState,
  signup: initialSignupState,
  cardDatabase: initialCardDatabaseState,
}

export interface AppActions {
  location: location.actions
  auth: AuthActions,
  login: LoginActions,
  signup: SignupActions
  cardDatabase: CardDatabaseActions,
}

const appActions: ActionsType<AppState, AppActions> = {
  location: location.actions,
  auth: authActions,
  login: loginActions,
  signup: signupActions,
  cardDatabase: cardDatabaseActions,
}

const Home = () => <div></div>

const view: View<AppState, AppActions> = (state, actions) => (
  <div>
    <NavigationView/>
    <Route path={NavigationPath.Home} render={Home}/>
    <Route path={NavigationPath.Login} render={LoginView(state, actions)}/>
    <Route path={NavigationPath.Signup} render={SignupView(state, actions)}/>
    <Route path={NavigationPath.CardDatabase} render={CardDatabaseView(state, actions)}/>
    <Route path={NavigationPath.CardCollection} render={CardCollectionView(state, actions)}/>
  </div>
)

export const mainActions = app(initialState, appActions, view, document.body)

const unsubscribe = location.subscribe(mainActions.location)
