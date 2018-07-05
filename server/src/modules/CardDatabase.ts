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

export enum MagicSetType {
  Core = 'core',
  Un = 'un',
  Promo = 'promo',
  Starter = 'starter',
  Planechase = 'planechase',
  Masters = 'masters',
  Reprint = 'reprint',
  BoardGameDeck = 'board game deck',
  FromTheVault = 'from the vault',
  DuelDeck = 'duel deck',
  Commander = 'commander',
  Expansion = 'expansion',
  Box = 'box',
  PremiumDeck = 'premium deck',
  Masterpiece = 'masterpiece',
  Conspiracy = 'conspiracy',
  Vanguard = 'vanguard',
  TwoHeadedGiant = 'Two-Headed Giant',
  Archenemy = 'archenemy',
}

export interface MagicSet {
  // "_id" : ObjectId("5b3d3cbea28a0249e7a658ae"),
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
      return await collection.find({}).limit(1000).toArray() as MagicCard[]
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
}
