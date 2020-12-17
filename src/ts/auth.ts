import 'firebase-config'
import firebase from 'firebase/app'
import 'firebase/auth'
import { setAuthStatus } from 'store/actions/auth-actions'
import store from 'store/index'

firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
  if (user) {
    store.dispatch(setAuthStatus(true))
  } else {
    store.dispatch(setAuthStatus(false))
  }
})
