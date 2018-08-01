import { h } from 'hyperapp'
import { MagicCard, MagicCardMoreInfo } from '../../../types/magic'
import { AppActions, AppState } from '../../app'
import LoadingSpinner from '../../components/loading-spinner'

import Tooltip from '../../components/tooltip'
import CardDatabaseService from '../../services/card-database'

// TODO Maybe ?
export interface CardState {
  card: MagicCard | null
  moreInfo: MagicCardMoreInfo | null
  cardCount: number
}

export const initialCardState: CardState = {
  card: null,
  moreInfo: null,
  cardCount: 0,
}

export interface CardActions {
  getCard: (id) => (state: CardState, actions: CardActions) => Promise<MagicCard>
  getCardCommit: (object: CardState) => (state: CardState) => CardState
}

export const cardActions: CardActions = {
  getCard: (id) => async (state: CardState, actions: CardActions) => {
    const card: MagicCard = await CardDatabaseService.getCardById(id)
    const moreInfo: MagicCardMoreInfo = await CardDatabaseService.getCardMoreInfo(id)
    const cardCount = await CardDatabaseService.getUserCardCount(id)
    actions.getCardCommit({ card, moreInfo, cardCount })
    return card
  },
  getCardCommit: (newState: CardState) => (state: CardState): CardState => ({ ...state, ...newState }),
}

const handleMoreInfoDetails = (key: keyof MagicCardMoreInfo, value: any) => {
  switch (key) {
    case 'printings':
      return (
        <div class="h2">{value.map((set) => (
          <Tooltip title={set}><i class={`m-2 ss ss-${set.toLowerCase()}`}/></Tooltip>))}
        </div>
      )
    default:
      return value
  }
}

interface CardItemProps {
  card: MagicCard
  moreInfo: MagicCardMoreInfo | null,
  cardCount: number
}

const CardItem = ({ card, moreInfo, cardCount }: CardItemProps) => (
  <div>
    <h1>{card.name}</h1>
    <div class="row">
      <div class="col-md-4 col-lg-3">
        <div class="cards-list-image rounded m-2">
          {card.imageUrl ? <img src={card.imageUrl}/> : <i class="fas fa-ban"/>}
        </div>
      </div>
      <div class="col-md-8 col-lg-9">
        <div class="row form-group">
          <div class="col-sm-3 col-lg-2">
            Card count:
          </div>
          <div class="col-sm-9 col-lg-10">
            {cardCount}
          </div>
        </div>
        <hr/>
        {moreInfo && Object.keys(moreInfo).map((key: keyof MagicCardMoreInfo) => moreInfo[key] ? (
          <div class="row form-group">
            <div class="col-sm-3 col-lg-2">
              {key}
            </div>
            <div class="col-sm-9 col-lg-10">
              {handleMoreInfoDetails(key, moreInfo[key])}
            </div>
          </div>
        ) : null)}
      </div>
    </div>
  </div>
)

export const CardView = (state: AppState, actions: AppActions) => ({ match }) => (
  <div class="container" oncreate={() => actions.card.getCard(match.params.id)}>
    {!state.card.card && <LoadingSpinner/>}
    {state.card.card &&
    <div>
      <CardItem
        card={state.card.card}
        moreInfo={state.card.moreInfo}
        cardCount={state.card.cardCount}
      />
    </div>}
  </div>
)

export default CardView
