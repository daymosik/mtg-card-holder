import * as Magic from 'mtgsdk-ts'
import { MagicCard, MagicCardMoreInfo } from '../../types/magic'
import { firebaseDatabase } from '../firebase'

const magicCardKeys: Array<keyof MagicCard> = (
  ['id', 'name', 'manaCost', 'colors', 'imageUrl', 'rarity', 'set', 'number', 'power', 'toughness', 'type']
)

const magicCardMoreInfoKeys: Array<keyof MagicCardMoreInfo> = [
  'cmc', 'colorIdentity', 'supertypes', 'types', 'subtypes', 'setName', 'text', 'flavor', 'artist', 'loyalty', 'layout',
  'multiverseid', 'watermark', 'rulings', 'printings', 'originalText', 'originalType', 'legalities',
]

export class MtgApi {
  public importCards() {
    const emiter = Magic.Cards.all({})
    const info = {
      cardsCount: 0,
      cardsAdded: 0,
    }

    emiter.on('data', async (card) => {
      const ref = await firebaseDatabase.ref(`cards/${card.id}`).once('value')
      const foundCard = ref.val()

      info.cardsCount++

      if (!foundCard) {
        console.log(card)

        const cardSimple = Object.keys(card).reduce((prev, key) => ({
          ...prev,
          ...(magicCardKeys.includes(key as keyof MagicCard) ? { [key]: card[key] } : {}),
        }), {})

        const cardMoreInfo = Object.keys(card).reduce((prev, key) => ({
          ...prev,
          ...(magicCardMoreInfoKeys.includes(key as keyof MagicCardMoreInfo) ? { [key]: card[key] } : {}),
        }), {})

        await firebaseDatabase.ref(`cards/${card.id}`).set(cardSimple)
        await firebaseDatabase.ref(`cards-more-info/${card.id}`).set(cardMoreInfo)

        info.cardsAdded++
      }
    }).on('end', () => {
      console.log('done')
      console.log(info)
    })
  }

  public importSets() {
    const emiter = Magic.Sets.all({})

    emiter.on('data', async (set) => {
      const ref = await firebaseDatabase.ref(`sets/${set.code}`).once('value')
      const foundSet = ref.val()

      if (!foundSet) {
        console.log(set)
        await firebaseDatabase.ref(`sets/${set.code}`).set(set)
      }
    }).on('end', () => {
      console.log('done')
    })
  }

  // public importTypes() {
  //   const collection = this.db.collection('types')
  //
  //   Magic.Types.all().then(async (types) => {
  //     for (const type of types) {
  //
  //       const ref = await firebaseDatabase.ref(`types`).once('value')
  //       const foundTypes = ref.val()
  //
  //       console.log(types)
  //       console.log(foundTypes)
  //
  //       // if (!found) {
  //       //   collection.insertOne({ name: type })
  //       // }
  //     }
  //   })
  // }

  // public importSupertypes() {
  //   const collection = this.db.collection('supertypes')
  //
  //   Magic.Supertypes.all().then(async (supertypes) => {
  //     for (const supertype of supertypes) {
  //       const found = await collection.findOne({ name: supertype })
  //       if (!found) {
  //         collection.insertOne({ name: supertype })
  //       }
  //     }
  //   })
  // }
  //
  // public importSubtypes() {
  //   const collection = this.db.collection('subtypes')
  //
  //   Magic.Subtypes.all().then(async (subtypes) => {
  //     for (const subtype of subtypes) {
  //       const found = await collection.findOne({ name: subtype })
  //       if (!found) {
  //         collection.insertOne({ name: subtype })
  //       }
  //     }
  //   })
  // }
  //
  // public importFormats() {
  //   const collection = this.db.collection('formats')
  //
  //   Magic.Formats.all().then(async (formats) => {
  //     for (const format of formats) {
  //       const found = await collection.findOne({ name: format })
  //       if (!found) {
  //         collection.insertOne({ name: format })
  //       }
  //     }
  //   })
  // }
}

const MtgApiService = new MtgApi()

export default MtgApiService
