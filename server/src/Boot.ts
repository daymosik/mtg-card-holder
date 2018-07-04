import DbClient from './modules/Mongo'
import Server from './Server'

const port: string = process.env.PORT || '8000'

const start = async () => {

  const db = await DbClient.connect()
  const app = new Server(db).app

  app.listen(port, (err) => {
    if (err) {
      // tslint:disable-next-line:no-console
      return console.log(err)
    }

    // tslint:disable-next-line:no-console
    return console.log(`server is listening on ${port}`)
  })
}

start()
