import { auth } from 'firebase'
import { Observable } from 'rxjs'
import { MagicCard, MagicCardMoreInfo, MagicSet } from '../../types/magic'
import { firebaseDatabase } from '../app'
import { UserMagicCard } from '../modules/card-collection'

class CardDatabase {
  public async addCardToCollection(card: MagicCard): Promise<MagicCard> {
    const user = auth().currentUser
    if (!user) {
      return Promise.reject('not authorized')
    }
    try {
      const ref = await firebaseDatabase.ref(`user-cards/${user.uid}/${card.id}`).once('value')
      const cardCheck = ref.val()

      if (!cardCheck) {
        await firebaseDatabase.ref(`user-cards/${user.uid}/${card.id}`).set(1)
      } else {
        await firebaseDatabase.ref(`user-cards/${user.uid}/${card.id}`).set(cardCheck + 1)
      }
      return card
    } catch (e) {
      return Promise.resolve(e)
    }
  }

  public async removeCardFromCollection(card: MagicCard): Promise<MagicCard> {
    const user = auth().currentUser
    if (!user) {
      return Promise.reject('not authorized')
    }
    try {
      const ref = await firebaseDatabase.ref(`user-cards/${user.uid}/${card.id}`).once('value')
      const cardCheck = ref.val()

      if (cardCheck === 1) {
        await firebaseDatabase.ref(`user-cards/${user.uid}/${card.id}`).set(null)
      } else if (cardCheck) {
        await firebaseDatabase.ref(`user-cards/${user.uid}/${card.id}`).set(cardCheck - 1)
      }
      return card
    } catch (e) {
      return Promise.resolve(e)
    }
  }

  public async getCardsForAutocomplete(value: string): Promise<MagicCard[]> {
    try {
      const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1)
      const valueToSend = capitalizeFirstLetter(value)
      const ref = await firebaseDatabase.ref('cards')
        .orderByChild('name')
        .startAt(valueToSend)
        .endAt(valueToSend + '\uf8ff')
        .limitToFirst(10)
        .once('value')
      const cards = ref.val()
      return cards ? Object.keys(cards).map((key) => cards[key]) : []
    } catch (e) {
      return Promise.resolve(e)
    }
  }

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

  // public async getUserCards(userId): Promise<UserMagicCard[]> {
  //   try {
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
  //   } catch (e) {
  //     return Promise.resolve(e)
  //   }
  // }

  public userCardsSubscriber(userId): Observable<UserMagicCard> {
    const getCard = async (id: string, count: number): Promise<UserMagicCard> => {
      const card = await this.getCardById(id)
      return { ...card, count }
    }

    return new Observable((observer) => {
      const handleOncomming = async (data, remove?): Promise<void> => {
        if (data && data.key) {
          const card = await getCard(data.key, remove ? 0 : data.val())
          observer.next(card)
        }
      }

      firebaseDatabase.ref(`user-cards/${userId}`)
        .on('child_changed', async (data) => handleOncomming(data))
      firebaseDatabase.ref(`user-cards/${userId}`)
        .on('child_added', async (data) => handleOncomming(data))
      firebaseDatabase.ref(`user-cards/${userId}`)
        .on('child_removed', async (data) => handleOncomming(data, true))
    })
  }

  public async getSets(): Promise<MagicSet[]> {
    try {
      const sets = await firebaseDatabase.ref('sets').once('value')
      return sets.val()
    } catch (e) {
      return Promise.resolve(e)
    }
  }

  // public async getTypes(): Promise<MagicSetType[]> {
  //   try {
  //     const types = await firebaseDatabase.ref('types').once('value')
  //     return types.val()
  //   } catch (e) {
  //     return Promise.resolve(e)
  //   }
  // }
}

const CardDatabaseService = new CardDatabase()

export default CardDatabaseService
