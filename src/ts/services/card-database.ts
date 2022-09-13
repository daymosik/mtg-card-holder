import { firebaseDatabase } from 'firebase-config'
import { MagicCard, MagicCardMoreInfo, MagicSet } from 'models/magic'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Observable, Subscriber } from 'rxjs'
import { UserMagicCard } from 'store/reducers/card-collection-reducers'

type MagicCardMap = { [key: string]: MagicCard }

type MagicSetMap = { [key: string]: MagicSet }

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)
const responseToArray = <T>(object: { [key: string]: T }): T[] =>
  object ? Object.keys(object).map((key) => object[key]) : []

export class CardDatabase {
  public async addCardToCollection(card: MagicCard): Promise<MagicCard> {
    const user = firebase.auth().currentUser
    if (!user) {
      return Promise.reject('not authorized')
    }
    const cardCount = await this.getUserCardCount(card.id)
    await this.setUserCardCount(user.uid, card.id, cardCount + 1)
    return card
  }

  public async removeCardFromCollection(card: MagicCard): Promise<MagicCard> {
    const user = firebase.auth().currentUser
    if (!user) {
      return Promise.reject('not authorized')
    }
    const cardCount = await this.getUserCardCount(card.id)
    await this.setUserCardCount(user.uid, card.id, cardCount === 1 ? null : cardCount - 1)
    return card
  }

  public async getCardsForAutocomplete(value: string): Promise<MagicCard[]> {
    const valueToSend = capitalizeFirstLetter(value)
    const ref = await firebaseDatabase
      .ref('cards')
      .orderByChild('name')
      .startAt(valueToSend)
      .endAt(valueToSend + '\uf8ff')
      .limitToFirst(10)
      .once('value')
    return responseToArray(ref.val() as MagicCardMap)
  }

  public async getCardById(id: string): Promise<MagicCard> {
    const ref = await firebaseDatabase.ref(`cards/${id}`).once('value')
    // TODO: as
    return ref.val() as MagicCard
  }

  public async getCardsBySet(set: string): Promise<MagicCard[]> {
    const ref = await firebaseDatabase.ref('cards').orderByChild('set').equalTo(set).limitToFirst(500).once('value')
    return responseToArray(ref.val() as MagicCardMap)
  }

  public async getCardMoreInfo(id: string): Promise<MagicCardMoreInfo> {
    const ref = await firebaseDatabase.ref(`cards-more-info/${id}`).once('value')
    // TODO: as
    return ref.val() as MagicCardMoreInfo
  }

  public userCardsSubscriber(userId: string): Observable<UserMagicCard> {
    const getCard = async (id: string, count: number): Promise<UserMagicCard> => {
      const card = await this.getCardById(id)
      return { ...card, count }
    }
    const handleOncomming = async (
      observer: Subscriber<UserMagicCard>,
      data: firebase.database.DataSnapshot,
      remove?: boolean,
    ): Promise<void> => {
      if (data && data.key) {
        // TODO
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const card = await getCard(data.key, remove ? 0 : data.val())
        observer.next(card)
      }
    }
    return new Observable((observer) => {
      firebaseDatabase.ref(`user-cards/${userId}`).on('child_changed', async (data) => handleOncomming(observer, data))
      firebaseDatabase.ref(`user-cards/${userId}`).on('child_added', async (data) => handleOncomming(observer, data))
      firebaseDatabase
        .ref(`user-cards/${userId}`)
        .on('child_removed', async (data) => handleOncomming(observer, data, true))
    })
  }

  public async getCards(): Promise<MagicSet> {
    const set = await firebaseDatabase.ref(`cards`).once('value')
    console.log(set.val())
    // TODO: as
    return set.val() as MagicSet
  }

  public async getUserCards(userId: string): Promise<MagicSet> {
    const set = await firebaseDatabase.ref(`user-cards/${userId}`).once('value')
    console.log(set.val())
    // TODO: as
    return set.val() as MagicSet
  }

  public async getSet(setCode: string): Promise<MagicSet> {
    const set = await firebaseDatabase.ref(`sets/${setCode}`).once('value')
    // TODO: as
    return set.val() as MagicSet
  }

  public async getSets(): Promise<MagicSet[]> {
    const sets = await firebaseDatabase.ref('sets').once('value')
    return responseToArray(sets.val() as MagicSetMap)
  }

  public async getUserCardCount(cardId: string): Promise<number> {
    const user = firebase.auth().currentUser
    const ref = await firebaseDatabase.ref(`user-cards/${user ? user.uid : '0'}/${cardId}`).once('value')
    // TODO: as
    return (ref.val() as number) || 0
  }

  private async setUserCardCount(userId: string, cardId: string, count: number | null): Promise<void> {
    await firebaseDatabase.ref(`user-cards/${userId}/${cardId}`).set(count)
  }
}

const CardDatabaseService = new CardDatabase()

export default CardDatabaseService
