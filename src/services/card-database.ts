import { MagicCard, MagicSet, MagicSetType } from '../../types/magic'
import { firebaseDatabase } from '../app'

class CardDatabaseService {
  public async getCardById(id: string): Promise<MagicCard> {
    try {
      const ref = await firebaseDatabase.ref('cards')
        .orderByChild('_id')
        .equalTo(id)
        .limitToFirst(1)
        .once('value')
      const cards = ref.val()
      return cards[Object.keys(cards)[0]]
    } catch (e) {
      return Promise.resolve(e)
    }
  }

  public async getCardsBySet(set): Promise<MagicCard[]> {
    try {
      const ref = await firebaseDatabase.ref('cards')
        .orderByChild('set')
        .equalTo(set)
        .limitToFirst(500)
        .once('value')
      const cards = ref.val()
      return Object.keys(cards).map((key) => cards[key])
    } catch (e) {
      return Promise.resolve(e)
    }
  }

  public async getSets(): Promise<MagicSet[]> {
    try {
      const sets = await firebaseDatabase.ref('sets').once('value')
      return sets.val()
    } catch (e) {
      return Promise.resolve(e)
    }
  }

  public async getTypes(): Promise<MagicSetType[]> {
    try {
      const types = await firebaseDatabase.ref('types').once('value')
      return types.val()
    } catch (e) {
      return Promise.resolve(e)
    }
  }
}

export default new CardDatabaseService()
