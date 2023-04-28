import { firebaseDatabase } from 'firebase-config'
import { ScrySet } from 'models/magic'
import { Observable, Subscriber } from 'rxjs'
import { UserMagicCard } from 'store/reducers/card-collection-reducers'
import { getAuth } from 'firebase/auth'
import {
  DataSnapshot,
  endAt,
  equalTo,
  get,
  limitToFirst,
  orderByChild,
  query,
  ref,
  set,
  startAt,
} from 'firebase/database'
import { onChildAdded, onChildChanged, onChildRemoved } from '@firebase/database'
import { ScryCard, ScryCardSimple } from 'models/magic'

type MagicCardMap = { [key: string]: ScryCardSimple }

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)
const responseToArray = <T>(object: { [key: string]: T }): T[] =>
  object ? Object.keys(object).map((key) => object[key]) : []

export class CardDatabase {
  public async addCardToCollection(card: ScryCardSimple): Promise<ScryCardSimple> {
    const user = getAuth().currentUser
    if (!user) {
      return Promise.reject('not authorized')
    }
    const cardCount = await this.getUserCardCount(card.id)
    await this.setUserCardCount(user.uid, card.id, cardCount + 1)
    return card
  }

  public async removeCardFromCollection(card: ScryCardSimple): Promise<ScryCardSimple> {
    const user = getAuth().currentUser
    if (!user) {
      return Promise.reject('not authorized')
    }
    const cardCount = await this.getUserCardCount(card.id)
    await this.setUserCardCount(user.uid, card.id, cardCount === 1 ? null : cardCount - 1)
    return card
  }

  public async getCardsForAutocomplete(value: string): Promise<ScryCardSimple[]> {
    const valueToSend = capitalizeFirstLetter(value)
    const response = await get(
      query(
        ref(firebaseDatabase, 'scry-cards-simple'),
        orderByChild('name'),
        startAt(valueToSend),
        endAt(valueToSend + '\uf8ff'),
        limitToFirst(10),
      ),
    )
    return responseToArray(response.val())
  }

  public async getCardById(id: string): Promise<ScryCardSimple> {
    const response = await get(ref(firebaseDatabase, `scry-cards-simple/${id}`))
    // TODO: as
    return response.val() as ScryCardSimple
  }

  public async getCardsBySet(set: string): Promise<ScryCardSimple[]> {
    const response = await get(
      query(ref(firebaseDatabase, 'scry-cards-simple'), orderByChild('set'), equalTo(set), limitToFirst(500)),
    )
    return responseToArray(response.val() as MagicCardMap)
  }

  public async getCardMoreInfo(id: string): Promise<ScryCard> {
    const response = await get(ref(firebaseDatabase, `scry-cards-full/${id}`))
    // TODO: as
    return response.val() as ScryCard
  }

  public userCardsSubscriber(userId: string): Observable<UserMagicCard> {
    const getCard = async (id: string, count: number): Promise<UserMagicCard> => {
      const card = await this.getCardById(id)
      return { ...card, count }
    }
    const handleOncomming = async (
      observer: Subscriber<UserMagicCard>,
      data: DataSnapshot,
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
      onChildChanged(ref(firebaseDatabase, `scry-user-cards/${userId}`), async (data) =>
        handleOncomming(observer, data),
      )
      onChildAdded(ref(firebaseDatabase, `scry-user-cards/${userId}`), async (data) => handleOncomming(observer, data))
      onChildRemoved(ref(firebaseDatabase, `scry-user-cards/${userId}`), async (data) =>
        handleOncomming(observer, data, true),
      )
    })
  }

  public async getCards(): Promise<ScryCardSimple[]> {
    const set = await get(ref(firebaseDatabase, 'scry-cards'))
    console.log(set.val())
    // TODO: as
    return set.val() as ScryCardSimple[]
  }

  public async getUserCards(userId: string): Promise<UserMagicCard[]> {
    const set = await get(ref(firebaseDatabase, `scry-user-cards/${userId}`))
    console.log(set.val())
    // TODO: as
    return set.val() as UserMagicCard[]
  }

  public async getSet(setCode: string): Promise<ScrySet> {
    const set = await get(ref(firebaseDatabase, `scry-sets/${setCode}`))
    // TODO: as
    return set.val() as ScrySet
  }

  public async getSets(): Promise<ScrySet[]> {
    const sets = await get(ref(firebaseDatabase, 'scry-sets'))
    return responseToArray(sets.val())
  }

  public async getUserCardCount(cardId: string): Promise<number> {
    const user = getAuth().currentUser
    const response = await get(ref(firebaseDatabase, `scry-user-cards/${user ? user.uid : '0'}/${cardId}`))
    // TODO: as
    return (response.val() as number) || 0
  }

  private async setUserCardCount(userId: string, cardId: string, count: number | null): Promise<void> {
    await set(ref(firebaseDatabase, `scry-user-cards/${userId}/${cardId}`), count)
  }
}

const CardDatabaseService = new CardDatabase()

export default CardDatabaseService
