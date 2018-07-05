import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as session from 'express-session'
import * as passport from 'passport'
import * as LocalStrategy from 'passport-local'
import * as path from 'path'
import * as R from 'ramda'
import CardDatabase from './modules/CardDatabase'
import * as Login from './modules/Login'

import MtgApi from './modules/mtgApi'
import * as Registration from './modules/Registration'
import * as User from './modules/User'

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).end()
}

const staticsPath = path.join(__dirname, '..', '..', '..', '..', 'front', 'build')

export default class Server {
  public app
  public db
  public mtgApi: MtgApi
  public cardDatabase: CardDatabase

  constructor(db) {
    this.db = db
    this.app = express()
    this.mtgApi = new MtgApi(this.db)
    this.cardDatabase = new CardDatabase(this.db)

    this.mountRoutes()
  }

  private mountRoutes(): void {
    this.app.use(bodyParser.json())
    this.app.use(express.static(staticsPath))
    this.app.set('views', staticsPath)

    this.app.use(session({
      secret: 'Shh, its a secret!',
      resave: false,
      saveUninitialized: false,
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, done) => {
        const validationResult = Login.validateLoginForm({
          email,
          password,
        })
        return !validationResult.success
          ? done(validationResult)
          : done(null, validationResult)
      },
    ))

    passport.serializeUser((user, done) => {
      done(null, user)
    })

    passport.deserializeUser((user, done) => {
      done(null, user)
    })

    this.app.use(passport.initialize())
    this.app.use(passport.session())

    this.app.post('/login', (req, res, next) => {
      return passport.authenticate('login', (err, user, info) => {
        const response = R.merge({
          success: false,
          user: null,
        }, err || user || info)

        if (response.success) {
          req.login({
            user_id: response.user.id,
          }, (error) => {
            if (error) {
              return next(error)
            }
            // else next();
            return res.status(200).json(response)
          })
        } else {
          return res.status(400).json(response)
        }
      })(req, res, next)
    })

    this.app.post('/register', async (req, res, next) => {
      const validationResult = Registration.validateRegistrationForm(req.body)
      if (validationResult.success) {
        await User.addUser(req.body)
        return passport.authenticate('login', (err, user, info) => {
          const response = R.merge({
            success: false,
            user: null,
          }, err || user || info)

          if (response.success) {
            req.login({
              user_id: response.user.id,
            }, (error) => {
              if (error) {
                return next(error)
              }
              // else next();
              return res.status(200).json(response)
            })
          } else {
            return res.status(400).json(response)
          }
        })(req, res, next)
      } else {
        return res.status(400).json(validationResult)
      }
    })

    this.app.use(isAuthenticated)

    this.app.post('/logout', (req, res) => {
      req.logout()
      res.status(200).end()
    })

    this.app.get('/check-login', (req, res) => {
      const userId = req.session.passport.user.user_id
      const user = User.getUserById(userId)
      res.send(user)
    })

    // Card database
    this.app.get('/api/card-database/get-cards', async (req, res) => {
      const cards = await this.cardDatabase.getCards(req.query)
      res.send(cards)
    })

    this.app.get('/api/card-database/get-sets', async (req, res) => {
      const sets = await this.cardDatabase.getSets()
      res.send(sets)
    })

    this.app.get('/api/card-database/get-types', async (req, res) => {
      const sets = await this.cardDatabase.getTypes()
      res.send(sets)
    })
  }
}
