import { setAuthStatus } from 'store/actions/auth-actions'
import store from 'store/index'
import { getAuth, User } from 'firebase/auth'

getAuth().onAuthStateChanged((user: User | null) => {
  if (user) {
    store.dispatch(setAuthStatus(true))
  } else {
    store.dispatch(setAuthStatus(false))
  }
})
