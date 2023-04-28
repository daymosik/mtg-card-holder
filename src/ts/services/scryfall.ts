import * as Scry from 'scryfall-sdk'
import { get, ref, set } from 'firebase/database'
import { firebaseDatabase } from 'firebase-config'
import { sessionStorageService } from 'services/storage'
import { ScryCard, ScryCardSimple } from 'models/magic'

export const scryCardSimpleKeys: Array<keyof ScryCardSimple> = [
  'id',
  'name',
  'mana_cost',
  'colors',
  'image_uris',
  'rarity',
  'set',
  'power',
  'toughness',
  'set_type',
  'type_line',
]

// api documentation https://scryfall.com/docs/api
export class ScryfallApi {
  public async importSets(force?: boolean): Promise<void> {
    console.log('⏳ Sets import started')
    const sets = await Scry.Sets.all()

    for (const magicSet of sets) {
      const response = await get(ref(firebaseDatabase, `scry-sets/${magicSet.code}`))
      const foundSet: Scry.Set = response.val()

      if (!foundSet || force) {
        console.log(`ℹ️ found new set ${magicSet.name}, saving...`)
        await set(ref(firebaseDatabase, `scry-sets/${magicSet.code}`), magicSet)
      } else {
        console.log(`✅ ${magicSet.name} already saved`)
      }
    }
    console.log('🍾🎊 Sets import complete 🍾🎊 ')
  }

  public async importCards(force?: boolean): Promise<void> {
    console.log('⏳ Cards import started')
    const cardNames = await Scry.Catalog.cardNames()

    const importedCardsFromStorage = sessionStorageService.getItem('importedCards')
    let importedCards = importedCardsFromStorage ? JSON.parse(importedCardsFromStorage) : null

    for (const cardName of cardNames) {
      const checkedInSession = importedCards?.includes(cardName)
      if (checkedInSession) {
        console.log(`⚠️ ${cardName} already checked in session`)
      } else {
        try {
          const card = await Scry.Cards.byName(cardName)
          const cardFromFirebase = await get(ref(firebaseDatabase, `scry-cards-simple/${card.id}`))
          const cardFullFromFirebase = await get(ref(firebaseDatabase, `scry-cards-full/${card.id}`))
          const foundCard: ScryCardSimple = cardFromFirebase.val()
          const foundCardFull: ScryCard = cardFullFromFirebase.val()

          if (!foundCard || !foundCardFull || force) {
            if (force && (foundCard || foundCardFull)) {
              console.log(`👀 replacing card ${card.name}, saving...`)
            } else {
              console.log(`ℹ️ found new card ${card.name}, saving...`)
            }

            const cardSimple = Object.keys(card).reduce(
              (prev, key) => ({
                ...prev,
                ...(scryCardSimpleKeys.includes(key as keyof ScryCardSimple)
                  ? { [key]: card[key as keyof ScryCardSimple] }
                  : {}),
              }),
              {},
            )

            await set(ref(firebaseDatabase, `scry-cards-simple/${card.id}`), cardSimple)
            await set(ref(firebaseDatabase, `scry-cards-full/${card.id}`), card)
          } else {
            console.log(`✅ ${card.name} already saved`)
          }
        } catch (e) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          console.log(`🛑 ${(e as any)?.details}` || e)
        }
      }

      importedCards = [...(importedCards || []), cardName]

      sessionStorageService.setItem('importedCards', JSON.stringify(importedCards))
    }
    console.log('🍾🎊 Cards import complete 🍾🎊 ')
  }
}

const scryfallService = new ScryfallApi()

export default scryfallService
