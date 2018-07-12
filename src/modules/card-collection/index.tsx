import { auth } from 'firebase'
import { h } from 'hyperapp'

import { Link } from 'hyperapp-hash-router'
import { MagicCard } from '../../../types/magic'
import { AppActions, AppState } from '../../app'
import ManaCostView from '../card/mana-cost'
import LoadingSpinner from '../../components/loading-spinner'

import CardDatabaseService from '../../services/card-database'
import AddCardForm from './add-card-form'

export interface UserMagicCard extends MagicCard {
  count: number
}

export interface UserMagicCardCollection {
  [id: string]: UserMagicCard,
}

export interface CardCollectionState {
  cards: UserMagicCardCollection
}

export const initialCardCollectionState: CardCollectionState = {
  cards: {},
}

export interface CardCollectionActions {
  getCards: () => (state: CardCollectionState, actions: CardCollectionActions) => void
  updateCardsList: (card: UserMagicCard) => (state: CardCollectionState) => CardCollectionState
  removeCardFromCollection: (card: UserMagicCard) => (state: CardCollectionState) => Promise<MagicCard>
}

let USER_CARD_SUBSCRIBER

export const cardCollectionActions: CardCollectionActions = {
  getCards: () => (state: CardCollectionState, actions: CardCollectionActions): void => {
    const user = auth().currentUser
    if (user) {
      if (!USER_CARD_SUBSCRIBER) {
        USER_CARD_SUBSCRIBER = CardDatabaseService.userCardsSubscriber(user.uid)
          .subscribe((value) => actions.updateCardsList(value))
      }
    }
  },
  updateCardsList: (card: UserMagicCard) => (state: CardCollectionState): CardCollectionState => ({
    ...state,
    cards: {
      ...state.cards,
      [card.id]: card,
    },
  }),
  removeCardFromCollection: (card: MagicCard) => async () => CardDatabaseService.removeCardFromCollection(card),
}

interface CardListTableProps {
  cards: UserMagicCardCollection
  removeCard: any
}

const CardListTable = ({ cards, removeCard }: CardListTableProps) => (
  <table class="table table-dark bg-transparent">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th></th>
        <th scope="col" class="text-center">Count</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {cards && Object.keys(cards).map((key, iterator) => {
        const card = cards[key]
        return card.count > 0 && <CardListItem key={iterator} card={card} removeCard={removeCard}/>
      })}
    </tbody>
  </table>
)

interface CardListItemProps {
  card: UserMagicCard
  key: number
  removeCard: any
}

const CardListItem = ({ card, key, removeCard }: CardListItemProps) => (
  <tr>
    <th scope="row">{key}</th>
    <td><Link to={`/card/${card.id}`}>{card.name}</Link></td>
    <td>{card.type}</td>
    <td class="text-right">{ManaCostView(card.manaCost)}</td>
    <td class="text-center">{card.count}</td>
    <th>
      <button class="btn btn-danger" onclick={() => removeCard(card)}>X</button>
    </th>
  </tr>
)

const notEmpty = (ob): boolean => Object.keys(ob).some((prop) => !!prop)

export const CardCollectionView = (state: AppState, actions: AppActions) => () => (
  <div class="container">
    <AddCardForm/>
    <br/>
    <div oncreate={() => actions.cardCollection.getCards()}>
      {!notEmpty(state.cardCollection.cards) && <LoadingSpinner/>}
      {notEmpty(state.cardCollection.cards) &&
      <CardListTable cards={state.cardCollection.cards} removeCard={actions.cardCollection.removeCardFromCollection}/>}
    </div>
  </div>
)

export default CardCollectionView
