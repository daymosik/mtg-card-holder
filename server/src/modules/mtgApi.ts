import { Db } from 'mongodb'
import * as Magic from 'mtgsdk-ts'

export enum MagicCardColors {
  White = 'White',
  Red = 'Red',
  Blue = 'Blue',
  Green = 'Green',
  Black = 'Black',
}

export enum MagicCardRarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
}

export interface MagicCard {
  name: string
  manaCost: string,
  cmc: number,
  colors: MagicCardColors[],
  colorIdentity: string[],
  type: string,
  supertypes?: string[],
  types: string[],
  subtypes: string[],
  rarity: MagicCardRarity,
  set: string,
  setName: string,
  text: string,
  flavor?: string,
  artist: string,
  number: string,
  power: string,
  toughness: string,
  loyalty?: string
  layout: string,
  multiverseid: number,
  imageUrl: string,
  watermark?: string,
  rulings: [{
    date: string,
    text: string,
  }],
  printings: string[],
  originalText: string,
  originalType: string,
  legalities: [{ format: string, legality: string }],
  id: string
}

export default class MtgApi {
  private db: Db

  constructor(db) {
    this.db = db
  }

  public importCards() {
    const collection = this.db.collection('cards')
    const emiter = Magic.Cards.all({})

    emiter.on('data', async (card) => {
      const found = await collection.findOne({ name: card.name })
      if (!found) {
        collection.insertOne(card)
      }
    }).on('end', () => {
      console.log('done')
    })
  }

  public importSets() {
    const collection = this.db.collection('sets')

    const emiter = Magic.Sets.all({})

    emiter.on('data', async (set) => {
      const found = await collection.findOne({ code: set.code })
      if (!found) {
        collection.insertOne(set)
      }
    }).on('end', () => {
      console.log('done')
    })
  }

  public importTypes() {
    const collection = this.db.collection('types')

    Magic.Types.all().then(async (types) => {
      for (const type of types) {
        const found = await collection.findOne({ name: type })
        if (!found) {
          collection.insertOne({ name: type })
        }
      }
    })
  }

  public importSupertypes() {
    const collection = this.db.collection('supertypes')

    Magic.Supertypes.all().then(async (supertypes) => {
      for (const supertype of supertypes) {
        const found = await collection.findOne({ name: supertype })
        if (!found) {
          collection.insertOne({ name: supertype })
        }
      }
    })
  }

  public importSubtypes() {
    const collection = this.db.collection('subtypes')

    Magic.Subtypes.all().then(async (subtypes) => {
      for (const subtype of subtypes) {
        const found = await collection.findOne({ name: subtype })
        if (!found) {
          collection.insertOne({ name: subtype })
        }
      }
    })
  }

  public importFormats() {
    const collection = this.db.collection('formats')

    Magic.Formats.all().then(async (formats) => {
      for (const format of formats) {
        const found = await collection.findOne({ name: format })
        if (!found) {
          collection.insertOne({ name: format })
        }
      }
    })
  }
}
