import { Db, ObjectId } from 'mongodb'
import { MagicCardColors, MagicCardRarity, MagicSetType } from '../../../types/magic'

export interface MagicSet {
  _id: string
  code: string
  name: string
  type: MagicSetType
  border: string
  releaseDate: string
  magicCardsInfoCode: string
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
  _id: string
}

export default class CardDatabase {
  private db: Db

  constructor(db) {
    this.db = db
  }

  public async getCards(query) {
    try {
      const collection = this.db.collection('cards')
      const collectionQuery = {}
      if (query._id) {
        Object.assign(collectionQuery, { _id: { $eq: new ObjectId(query._id) } })
      }
      if (query.set) {
        Object.assign(collectionQuery, { set: { $eq: query.set } })
      }
      return await collection.find(collectionQuery).limit(1000).toArray() as MagicCard[]
    } catch (e) {
      return Promise.reject(e)
    }
  }

  public async getSets() {
    try {
      const collection = this.db.collection('sets')
      return await collection.find({}).toArray() as MagicSet[]
    } catch (e) {
      return Promise.reject(e)
    }
  }

  public async getTypes() {
    try {
      const collection = this.db.collection('types')
      const types = await collection.find({}).toArray()
      return types.map((t) => t.name) as MagicSetType[]
    } catch (e) {
      return Promise.reject(e)
    }
  }

  public async getSupertypes() {
    try {
      const collection = this.db.collection('supertypes')
      const types = await collection.find({}).toArray()
      return types.map((t) => t.name)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
