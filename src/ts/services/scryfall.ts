import * as Scry from 'scryfall-sdk'

export class ScryfallApi {
  public async getCard() {
    const chalice = await Scry.Cards.byName('Chalice of the Void')
    console.log(chalice.name, chalice.set)
  }
}

const scryfallService = new ScryfallApi()

export default scryfallService
