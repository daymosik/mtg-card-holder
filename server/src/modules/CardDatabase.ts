import { Db } from 'mongodb'

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

export default class CardDatabase {
  private db: Db

  constructor(db) {
    this.db = db
  }

  public async getCards() {
    try {
      const collection = this.db.collection('cards')
      const cards = await collection.find({}).limit(5).toArray()
      return cards
    } catch (e) {
      return Promise.reject(e)
    }

  }
}
