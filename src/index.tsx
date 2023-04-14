import { render, h } from 'preact'

import './assets/styles/app.scss'
import App from './ts/app'

// TODO
render(<App />, document.getElementById('app') as never)
