import { MagicCard, MagicCardMoreInfo, MagicSet, MagicSetType } from '../../types/magic'
import { firebaseDatabase } from '../app'
import { UserMagicCard } from '../modules/card-collection'

class CardDatabaseService {
  public async getCardById(id: string): Promise<MagicCard> {
    try {
      const ref = await firebaseDatabase.ref(`cards/${id}`).once('value')
      return ref.val()
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

  public async getCardMoreInfo(id: string): Promise<MagicCardMoreInfo> {
    try {
      const ref = await firebaseDatabase.ref(`cards-more-info/${id}`).once('value')
      return ref.val()
    } catch (e) {
      return Promise.resolve(e)
    }
  }

  public async getUserCards(userId): Promise<UserMagicCard[]> {
    try {
      const ref = await firebaseDatabase.ref(`user-cards/${userId}`).once('value')
      const cards = ref.val()
      const clean = Object.keys(cards).map((key) => cards[key])

      const userCardsPromise = await clean.map(async (card) => {
        const ref2 = await firebaseDatabase.ref(`cards/${card.id}`).once('value')
        const additionalInfo = ref2.val()
        return { ...card, additionalInfo }
      })
      const userCards = await Promise.all(userCardsPromise)
      return userCards
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
