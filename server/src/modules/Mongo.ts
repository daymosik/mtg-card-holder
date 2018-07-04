import { MongoClient } from 'mongodb'

class DbClient {
  public db

  public async connect() {
    try {
      const connection = await MongoClient.connect('mongodb://localhost:27017/mtg-test')
      this.db = connection.db('mtg-test')
      // tslint:disable-next-line no-console
      console.log('Connected to db')
      return this.db
    } catch (error) {
      // tslint:disable-next-line no-console
      console.log('Unable to connect to db')
    }
  }
}

export default new DbClient()
