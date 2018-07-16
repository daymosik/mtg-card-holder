import { auth } from 'firebase'
import { Observable } from 'rxjs'
import { MagicCard, MagicCardMoreInfo, MagicSet } from '../../types/magic'
import { firebaseDatabase } from '../app'
import { UserMagicCard } from '../modules/card-collection'

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)
const responseToArray = (object: object): any[] => object ? Object.keys(object).map((key) => object[key]) : []

class CardDatabase {
  public async addCardToCollection(card: MagicCard): Promise<MagicCard> {
    const user = auth().currentUser
    if (!user) {
      return Promise.reject('not authorized')
    }
    const cardCount = await this.getUserCardCount(user.uid, card.id)
    await this.setUserCardCount(user.uid, card.id, cardCount + 1)
    return card
  }

  public async removeCardFromCollection(card: MagicCard): Promise<MagicCard> {
    const user = auth().currentUser
    if (!user) {
      return Promise.reject('not authorized')
    }
    const cardCount = await this.getUserCardCount(user.uid, card.id)
    await this.setUserCardCount(user.uid, card.id, cardCount === 1 ? null : cardCount - 1)
    return card
  }

  public async getCardsForAutocomplete(value: string): Promise<MagicCard[]> {
    const valueToSend = capitalizeFirstLetter(value)
    const ref = await firebaseDatabase.ref('cards')
      .orderByChild('name')
      .startAt(valueToSend)
      .endAt(valueToSend + '\uf8ff')
      .limitToFirst(10)
      .once('value')
    return responseToArray(ref.val())
  }

  public async getCardById(id: string): Promise<MagicCard> {
    const ref = await firebaseDatabase.ref(`cards/${id}`).once('value')
    return ref.val()
  }

  public async getCardsBySet(set): Promise<MagicCard[]> {
    const ref = await firebaseDatabase.ref('cards')
      .orderByChild('set')
      .equalTo(set)
      .limitToFirst(500)
      .once('value')
    return responseToArray(ref.val())
  }

  public async getCardMoreInfo(id: string): Promise<MagicCardMoreInfo> {
    const ref = await firebaseDatabase.ref(`cards-more-info/${id}`).once('value')
    return ref.val()
  }

  // public async getUserCards(userId): Promise<UserMagicCard[]> {
  //     const ref = await firebaseDatabase.ref(`user-cards/${userId}`).once('value')
  //     const cards = ref.val()
  //
  //     await firebaseDatabase.ref(`user-cards/${userId}`).set({})
  //
  //     await Object.keys(cards).map(async (key) => {
  //       await firebaseDatabase.ref(`user-cards/${userId}/${cards[key].id}`).set(cards[key].count)
  //       console.log(cards[key].id)
  //     })
  //     return cards
  // }

  public userCardsSubscriber(userId): Observable<UserMagicCard> {
    const getCard = async (id: string, count: number): Promise<UserMagicCard> => {
      const card = await this.getCardById(id)
      return { ...card, count }
    }
    const handleOncomming = async (observer, data, remove?): Promise<void> => {
      if (data && data.key) {
        const card = await getCard(data.key, remove ? 0 : data.val())
        observer.next(card)
      }
    }
    return new Observable((observer) => {
      firebaseDatabase.ref(`user-cards/${userId}`)
        .on('child_changed', async (data) => handleOncomming(observer, data))
      firebaseDatabase.ref(`user-cards/${userId}`)
        .on('child_added', async (data) => handleOncomming(observer, data))
      firebaseDatabase.ref(`user-cards/${userId}`)
        .on('child_removed', async (data) => handleOncomming(observer, data, true))
    })
  }

  public async getSets(): Promise<MagicSet[]> {
    const sets = await firebaseDatabase.ref('sets').once('value')
    return sets.val()
  }

  private async getUserCardCount(userId: string, cardId: string): Promise<number> {
    const ref = await firebaseDatabase.ref(`user-cards/${userId}/${cardId}`).once('value')
    return ref.val() || 0
  }

  private async setUserCardCount(userId: string, cardId: string, count: number | null): Promise<void> {
    await firebaseDatabase.ref(`user-cards/${userId}/${cardId}`).set(count)
  }
}

const CardDatabaseService = new CardDatabase()

export default CardDatabaseService
