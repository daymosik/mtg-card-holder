import 'bootstrap/scss/bootstrap.scss'
import * as firebase from 'firebase'
import { ActionsType, app, h } from 'hyperapp'
import { Link, location, Route } from 'hyperapp-hash-router'
import { firebaseConfig } from '../firebase.config'

import './assets/styles/app.scss'
import ProtectedRoute from './components/protected-route'

import CardCollectionView from './modules/card-collection'
import CardDatabaseView, {
  cardDatabaseActions,
  CardDatabaseActions,
  CardDatabaseState,
  initialCardDatabaseState,
} from './modules/card-database'
import CardView, { cardActions, CardActions, CardState, initialCardState } from './modules/card-database/card'
import SetView, {
  cardSetActions,
  CardSetActions,
  CardSetState,
  initialCardSetState,
} from './modules/card-database/set'
import LoginView, { initialLoginState, LoginActions, loginActions, LoginState } from './modules/login'
import SignupView, { initialSignupState, signupActions, SignupActions, SignupState } from './modules/signup'
import NavigationView, {
  initialNavigationState,
  NavigationActions,
  navigationAgtions,
  NavigationPath,
  NavigationState,
} from './navigation'

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const firebaseDatabase = firebase.database()

firebase.auth().onAuthStateChanged((user: firebase.User) => {
  if (user) {
    mainActions.auth.authorize()
  } else {
    mainActions.auth.unauthorize()
  }
})

interface AuthState {
  authorized: boolean,
}

const initialAuthState: AuthState = {
  authorized: false,
}

interface AuthActions {
  authorize: () => (state: AuthState) => AuthState
  unauthorize: () => (state: AuthState) => AuthState
}

const authActions: AuthActions = {
  authorize: () => (state: AuthState): AuthState => ({ ...state, authorized: true }),
  unauthorize: () => (state: AuthState): AuthState => ({ ...state, authorized: false }),
}

export interface AppState {
  location: location.state
  auth: AuthState
  nav: NavigationState
  login: LoginState
  signup: SignupState
  cardDatabase: CardDatabaseState
  cardSet: CardSetState,
  card: CardState,
}

const initialState: AppState = {
  location: location.state,
  auth: initialAuthState,
  nav: initialNavigationState,
  login: initialLoginState,
  signup: initialSignupState,
  cardDatabase: initialCardDatabaseState,
  cardSet: initialCardSetState,
  card: initialCardState,
}

export interface AppActions {
  location: location.actions
  auth: AuthActions,
  nav: NavigationActions,
  login: LoginActions,
  signup: SignupActions
  cardDatabase: CardDatabaseActions,
  cardSet: CardSetActions,
  card: CardActions,
}

const appActions: ActionsType<AppState, AppActions> = {
  location: location.actions,
  auth: authActions,
  nav: navigationAgtions,
  login: loginActions,
  signup: signupActions,
  cardDatabase: cardDatabaseActions,
  cardSet: cardSetActions,
  card: cardActions,
}

const Home = () => <div>Home</div>

const view = (state: AppState, actions: AppActions) => (
  <div>
    <NavigationView/>
    <Route path={NavigationPath.Home} render={Home}/>
    <Route path={NavigationPath.Login} render={LoginView(state, actions)}/>
    <Route path={NavigationPath.Signup} render={SignupView(state, actions)}/>
    <ProtectedRoute path={NavigationPath.CardDatabase} render={CardDatabaseView}/>
    <ProtectedRoute path={NavigationPath.CardCollection} render={CardCollectionView}/>
    <Route path={`/set/:code`} render={SetView(state, actions)}/>
    <Route path={`/card/:id`} render={CardView(state, actions)}/>
  </div>
)

export const mainActions = app(initialState, appActions, view, document.body)

const unsubscribe = location.subscribe(mainActions.location)
