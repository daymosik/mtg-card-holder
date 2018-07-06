import { h } from 'hyperapp'
import { MagicCard } from '../../../types/magic'
import { AppActions, AppState } from '../../app'
import CardDatabaseService from '../../services/card-database'

// TODO Maybe ?
export interface CardState {
  card: MagicCard | null
}

export const initialCardState = {
  card: null,
}

export interface CardActions {
  getCard: typeof cardActions.getCard
  getCardsCommit: typeof cardActions.getCardsCommit
}

export const cardActions = {
  getCard: ({ rootState, id }) => async (state: CardState, actions: CardActions) => {
    try {
      const card: MagicCard = await CardDatabaseService.getCardById(id)
      actions.getCardsCommit(card)
      return card
    } catch (e) {
      console.log(e)
    }
  },
  getCardsCommit: (card: MagicCard) => (state: CardState): CardState => ({ ...state, card }),
}

interface CardItemProps {
  card: MagicCard,
}

const CardItem = ({ card }: CardItemProps) => (
  <div>
    <h1>{card.name}</h1>
    <img src={card.imageUrl}/>
  </div>
)

export const CardView = (state: AppState, actions: AppActions) => ({ match }) => (
  <div class="container" oncreate={() => actions.card.getCard({ rootState: state, id: match.params.id })}>
    {state.card.card && <CardItem card={state.card.card}/>}
  </div>
)

export default CardView
