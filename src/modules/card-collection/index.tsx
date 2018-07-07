import { auth } from 'firebase'
import { h } from 'hyperapp'

import { Link } from 'hyperapp-hash-router'
import { MagicCard } from '../../../types/magic'
import { AppActions, AppState } from '../../app'
import ManaCostView from '../../components/card/mana-cost'
import LoadingSpinner from '../../components/loading-spinner'

import CardDatabaseService from '../../services/card-database'
import AddCardForm from './add-card-form'

export interface UserMagicCard {
  count: number,
  name: string,
  edition: string,
  additionalInfo: MagicCard
}

export interface CardCollectionState {
  cards: UserMagicCard[]
}

export const initialCardCollectionState: CardCollectionState = {
  cards: [],
}

export interface CardCollectionActions {
  getCards: () => (state: CardCollectionState, actions: CardCollectionActions) => Promise<UserMagicCard[]>
  getCardsCommit: (cards: UserMagicCard[]) => (state: CardCollectionState) => CardCollectionState
}

export const cardCollectionActions: CardCollectionActions = {
  getCards: () => async (state: CardCollectionState, actions: CardCollectionActions): Promise<UserMagicCard[]> => {
    const user = auth().currentUser
    if (!user) {
      return []
    }
    try {
      const cards = await CardDatabaseService.getUserCards(user.uid)
      actions.getCardsCommit(cards)
      return cards
    } catch (e) {
      console.log(e)
      return e
    }
  },
  getCardsCommit: (cards) => (state) => ({ ...state, cards }),
}

interface CardListTableProps {
  cards: UserMagicCard[]
}

const CardListTable = ({ cards }: CardListTableProps) => (
  <table class="table table-light">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {cards && cards.map((card, key) => <CardListItem key={key} card={card}/>)}
    </tbody>
  </table>
)

interface CardListItemProps {
  card: UserMagicCard
  key: number
}

const CardListItem = ({ card, key }: CardListItemProps) => (
  <tr>
    <th scope="row">{key}</th>
    <td><Link to={`/card/${card.additionalInfo._id}`}>{card.additionalInfo.name}</Link></td>
    <td>{card.additionalInfo.type}</td>
    <td class="text-right">{ManaCostView(card.additionalInfo.manaCost)}</td>
  </tr>
)

export const CardCollectionView = (state: AppState, actions: AppActions) => () => (
  <div>
    <h1>Card Collection</h1>
    <AddCardForm/>
    <div oncreate={() => actions.cardCollection.getCards()}>
      {!state.cardCollection.cards.length && <LoadingSpinner/>}
      {state.cardCollection.cards.length > 0 && <CardListTable cards={state.cardCollection.cards}/>}
    </div>
  </div>
)

export default CardCollectionView
