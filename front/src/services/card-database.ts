import axios from 'axios'

class CardDatabaseService {
  public async getCards() {
    try {
      const cardsResponse = await axios.get('/api/card-database/get-cards')
      return cardsResponse.data
    } catch (e) {
      return Promise.resolve(e)
    }
  }
}

export default new CardDatabaseService()
