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
  _id: string
  code: string
  name: string
  type: MagicSetType
  border: string
  releaseDate: string
  magicCardsInfoCode: string
}

export interface MagicCard {
  id: string
  name: string
  manaCost: string
  colors: MagicCardColors[]
  imageUrl: string
  rarity: MagicCardRarity
  set: string
  number: string
  power: string
  toughness: string
  type: string
}

export interface MagicCardMoreInfo {
  cmc: number
  colorIdentity: string[]
  supertypes?: string[]
  types: string[]
  subtypes: string[]
  setName: string
  text: string
  flavor?: string
  artist: string
  loyalty?: string
  layout: string
  multiverseid: number
  watermark?: string
  rulings: MagicCardMoreInfoRulings[]
  printings: string[]
  originalText: string
  originalType: string
  legalities: MagicCardMoreInfoLegalities[]
}

export interface MagicCardMoreInfoRulings {
  date: string
  text: string
}

export interface MagicCardMoreInfoLegalities {
  format: string
  legality: string
}

export type MagicCardKeys = keyof MagicCard

export type MagicCardValues = MagicCard[MagicCardKeys]

export type MagicCardMoreInfoKeys = keyof MagicCardMoreInfo

export type MagicCardMoreInfoValues = MagicCardMoreInfo[MagicCardMoreInfoKeys]
