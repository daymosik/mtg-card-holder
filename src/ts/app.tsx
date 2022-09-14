import PrivateRoute from 'components/private-route'
import { NavigationPath } from 'models/routes'
import AdminView from 'modules/admin/admin'
import CardCollectionView from 'modules/card-collection/card-collection'
import CardDatabaseView from 'modules/card-database/card-database'
import SetView from 'modules/card-database/set'
import CardRecognitionView from 'modules/card-recognition/card-recognition'
import CardView from 'modules/card/card'
import LoginView from 'modules/login/login'
import SignupView from 'modules/signup/signup'
import { Provider } from 'react-redux'
import FooterView from 'slices/footer'
import NavigationView from 'slices/navigation'
import { FunctionalComponent, h } from 'preact'
import { Route, Router, RouterOnChangeArgs } from 'preact-router'
import store from 'store/index'
import 'auth'
import StartupView from './startup'

const Home: FunctionalComponent = () => <div class="container">Home</div>

const App: FunctionalComponent = () => {
  // TODO
  let currentUrl: string
  const handleRoute = (e: RouterOnChangeArgs) => {
    currentUrl = e.url
    console.log(currentUrl)
  }

  return (
    <div id="preact_root">
      <Provider store={store}>
        <StartupView>
          <div class="wrapper">
            <NavigationView />
            <Router onChange={handleRoute}>
              <Route path={NavigationPath.Home} component={Home} />
              <Route path={NavigationPath.Login} component={LoginView} />
              <Route path={NavigationPath.Signup} component={SignupView} />
              <PrivateRoute path={NavigationPath.CardDatabase} component={CardDatabaseView} />
              <PrivateRoute path={NavigationPath.CardCollection} component={CardCollectionView} />
              <PrivateRoute path={NavigationPath.CardRecognition} component={CardRecognitionView} />
              <Route path={`/set/:code`} component={SetView} />
              <Route path={`/card/:id`} component={CardView} />
              <PrivateRoute path={NavigationPath.Admin} component={AdminView} />
            </Router>
            <FooterView />
          </div>
        </StartupView>
      </Provider>
    </div>
  )
}

export default App
