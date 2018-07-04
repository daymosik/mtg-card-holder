import { h } from 'hyperapp'
import { MagicCard } from '../../../../server/src/modules/CardDatabase'
import { AppActions, AppState } from '../../app'
import CardDatabaseService from '../../services/card-database'

export interface CardDatabaseState {
  cards: MagicCard[]
}

export const initialCardDatabaseState = {
  cards: [],
}

export interface CardDatabaseActions {
  getCards: () => (state: CardDatabaseState) => Promise<CardDatabaseState>,
  getCardsCommit: (cards: MagicCard[]) => (state: CardDatabaseState) => CardDatabaseState
}

export const cardDatabaseActions = {
  getCards: () => async (state: CardDatabaseState, actions: CardDatabaseActions) => {
    try {
      const cards = await CardDatabaseService.getCards()
      actions.getCardsCommit(cards)
      return cards
    } catch (e) {
      console.log(e)
    }
  },
  getCardsCommit: (cards: MagicCard[]) => (state: CardDatabaseState) => ({ ...state, cards }),
}

interface CardListItemProps {
  card: MagicCard
}

const CardListItem = ({ card }: CardListItemProps) => (
  <div>{card.name}</div>
)

export const CardDatabaseView = (state: AppState, actions: AppActions) => () => (
  <div>
    <h1>Card Database</h1>
    <div oncreate={() => actions.cardDatabase.getCards()}>
      {state.cardDatabase.cards && state.cardDatabase.cards.map((card) => <CardListItem card={card}/>)}
    </div>
  </div>
)

export default CardDatabaseView
