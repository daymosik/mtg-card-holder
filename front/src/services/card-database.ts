import axios from 'axios'
import { MagicCard, MagicSet } from '../../../server/src/modules/CardDatabase'

interface GetCardsFilter {
  set?: string,
}

class CardDatabaseService {
  public async getCards(filter: GetCardsFilter): Promise<MagicCard[]> {
    try {
      const cardsResponse = await axios.get('/api/card-database/get-cards', {
        params: {
          ...filter,
        },
      })
      return cardsResponse.data
    } catch (e) {
      return Promise.resolve(e)
    }
  }

  public async getSets(): Promise<MagicSet[]> {
    try {
      const cardsResponse = await axios.get('/api/card-database/get-sets')
      return cardsResponse.data
    } catch (e) {
      return Promise.resolve(e)
    }
  }
}

export default new CardDatabaseService()
