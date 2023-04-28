import * as Scry from 'scryfall-sdk'

export type ScryCard = Scry.Card

export type ScryCardSimple = Pick<
  Scry.Card,
  | 'id'
  | 'name'
  | 'mana_cost'
  | 'colors'
  | 'image_uris'
  | 'rarity'
  | 'set'
  | 'power'
  | 'toughness'
  | 'set_type'
  | 'type_line'
>

export type ScrySet = Scry.Set

export type ScrySetType = ScrySet['set_type']

export type ScryLegalities = Scry.Legalities

export type ScryCardSimpleKeys = keyof ScryCardSimple

export type ScryCardSimpleValues = ScryCardSimple[ScryCardSimpleKeys]

export type ScryCardKeys = keyof ScryCard

export type ScryCardValues = ScryCard[ScryCardKeys]
