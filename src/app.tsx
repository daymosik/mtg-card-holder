import firebase = require('firebase/app')
import 'firebase/database'
import { ActionsType, app, h } from 'hyperapp'
import { Link, location, Route } from 'hyperapp-hash-router'

import './assets/styles/app.scss'
import ProtectedRoute from './components/protected-route'
import FooterView from './footer'

import CardCollectionView, {
  cardCollectionActions,
  CardCollectionActions,
  CardCollectionState,
  initialCardCollectionState,
} from './modules/card-collection'
import {
  addCardFormActions,
  AddCardFormActions,
  AddCardFormState,
  initialAddCardFormState,
} from './modules/card-collection/add-card-form'
import CardDatabaseView, {
  cardDatabaseActions,
  CardDatabaseActions,
  CardDatabaseState,
  initialCardDatabaseState,
} from './modules/card-database'
import SetView, {
  cardSetActions,
  CardSetActions,
  CardSetState,
  initialCardSetState,
} from './modules/card-database/set'
import CardView, { cardActions, CardActions, CardState, initialCardState } from './modules/card/card'
import LoginView, { initialLoginState, LoginActions, loginActions, LoginState } from './modules/login'
import SignupView, { initialSignupState, signupActions, SignupActions, SignupState } from './modules/signup'
import NavigationView, {
  initialNavigationState,
  NavigationActions,
  navigationAgtions,
  NavigationPath,
  NavigationState,
} from './navigation'
import LazyLoad from './utils/lazy-load'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
}

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
  cardForm: AddCardFormState,
  cardCollection: CardCollectionState,
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
  cardForm: initialAddCardFormState,
  cardCollection: initialCardCollectionState,
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
  cardForm: AddCardFormActions,
  cardCollection: CardCollectionActions,
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
  cardForm: addCardFormActions,
  cardCollection: cardCollectionActions,
}

const Home = () => <div class="container">Home</div>

const view = (state: AppState, actions: AppActions) => (
  <div class="wrapper" oncreate={LazyLoad.startLazyLoad}>
    <NavigationView/>
    <Route path={NavigationPath.Home} render={Home}/>
    <Route path={NavigationPath.Login} render={LoginView(state, actions)}/>
    <Route path={NavigationPath.Signup} render={SignupView(state, actions)}/>
    <ProtectedRoute path={NavigationPath.CardDatabase} render={CardDatabaseView}/>
    <ProtectedRoute path={NavigationPath.CardCollection} render={CardCollectionView}/>
    <Route path={`/set/:code`} render={SetView(state, actions)}/>
    <Route path={`/card/:id`} render={CardView(state, actions)}/>
    <FooterView/>
  </div>
)

export const mainActions = app(initialState, appActions, view, document.body)

const unsubscribe = location.subscribe(mainActions.location)
