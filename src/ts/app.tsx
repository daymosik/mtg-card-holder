import { authActions, AuthActions, AuthState, initialAuthState } from '@auth'
import '@firebase-config'
import AdminView, { adminActions, AdminActions, AdminState, initialAdminState } from '@modules/admin/admin'
import {
  addCardFormActions, AddCardFormActions, AddCardFormState, initialAddCardFormState,
} from '@modules/card-collection/add-card-form'
import CameraView from '@modules/card-collection/camera'
import CardCollectionView, {
  cardCollectionActions, CardCollectionActions, CardCollectionState, initialCardCollectionState,
} from '@modules/card-collection/card-collection'
import CardDatabaseView, {
  cardDatabaseActions, CardDatabaseActions, CardDatabaseState, initialCardDatabaseState,
} from '@modules/card-database/card-database'
import SetView, {
  cardSetActions, CardSetActions, CardSetState, initialCardSetState,
} from '@modules/card-database/set'
import CardView, { cardActions, CardActions, CardState, initialCardState } from '@modules/card/card'
import LoginView, { initialLoginState, LoginActions, loginActions, LoginState } from '@modules/login/login'
import SignupView, { initialSignupState, signupActions, SignupActions, SignupState } from '@modules/signup/signup'
import FooterView from '@slices/footer'
import NavigationView, {
  initialNavigationState, NavigationActions, navigationAgtions, NavigationPath, NavigationState,
} from '@slices/navigation'
import LazyLoad from '@utils/lazy-load'
import { ActionsType, app, h } from 'hyperapp'
import { Link, location, Route } from 'hyperapp-hash-router'
import '../assets/styles/app.scss'
import ProtectedRoute from './components/protected-route'

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
  admin: AdminState,
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
  admin: initialAdminState,
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
  admin: AdminActions,
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
  admin: adminActions,
}

const Home = () => <div class="container">Home</div>

const view = (state: AppState, actions: AppActions) => (
  <div class="wrapper" oncreate={LazyLoad.startLazyLoad}>
    <NavigationView/>
    <Route path={NavigationPath.Home} render={Home}/>
    <Route path={NavigationPath.Login} render={LoginView(state, actions)}/>
    <Route path={NavigationPath.Signup} render={SignupView(state, actions)}/>
    <Route path={NavigationPath.CardDatabase} render={CardDatabaseView}/>
    <ProtectedRoute path={NavigationPath.CardCollection} render={CardCollectionView}/>
    <Route path={NavigationPath.Camera} render={CameraView(state, actions)}/>
    <Route path={`/set/:code`} render={SetView(state, actions)}/>
    <Route path={`/card/:id`} render={CardView(state, actions)}/>
    <ProtectedRoute path={NavigationPath.Admin} render={AdminView}/>
    <FooterView/>
  </div>
)

export const mainActions = app(initialState, appActions, view, document.body)

const unsubscribe = location.subscribe(mainActions.location)
