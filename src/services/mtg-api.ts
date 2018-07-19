import * as Magic from 'mtgsdk-ts'
import { firebaseDatabase } from '../app'

export default class MtgApi {
  // public importCards() {
  //   const collection = this.db.collection('cards')
  //   const emiter = Magic.Cards.all({})
  //
  //   emiter.on('data', async (card) => {
  //     const found = await collection.findOne({ name: card.name })
  //     if (!found) {
  //       collection.insertOne(card)
  //     }
  //   }).on('end', () => {
  //     console.log('done')
  //   })
  // }

  public importSets() {
    const emiter = Magic.Sets.all({})

    emiter.on('data', async (set) => {
      const ref = await firebaseDatabase.ref(`sets/${set.code}`).once('value')
      const foundSet = ref.val()

      if (!foundSet) {
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
  //       const found = await collection.findOne({ name: type })
  //       if (!found) {
  //         collection.insertOne({ name: type })
  //       }
  //     }
  //   })
  // }
  //
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
