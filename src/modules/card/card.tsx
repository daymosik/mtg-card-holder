import {h} from 'hyperapp'
import {MagicCard, MagicCardMoreInfo} from '../../../types/magic'
import {AppActions, AppState} from '../../app'
import LoadingSpinner from '../../components/loading-spinner'
import CardDatabaseService from '../../services/card-database'

// TODO Maybe ?
export interface CardState {
  card: MagicCard | null
  moreInfo: MagicCardMoreInfo | null
}

export const initialCardState: CardState = {
  card: null,
  moreInfo: null,
}

export interface CardActions {
  getCard: typeof cardActions.getCard
  getCardsCommit: typeof cardActions.getCardsCommit
}

export const cardActions = {
  getCard: ({rootState, id}) => async (state: CardState, actions: CardActions) => {
    const card: MagicCard = await CardDatabaseService.getCardById(id)
    const moreInfo: MagicCardMoreInfo = await CardDatabaseService.getCardMoreInfo(id)
    actions.getCardsCommit({card, moreInfo})
    return card
  },
  getCardsCommit: ({card, moreInfo}) => (state: CardState): CardState => ({...state, card, moreInfo}),
}

interface CardItemProps {
  card: MagicCard
  moreInfo: MagicCardMoreInfo | null,
}

const CardItem = ({card, moreInfo}: CardItemProps) => (
  <div>
    <h1>{card.name}</h1>
    <div class="row">
      <div class="col-md-4 col-lg-3">
        <img src={card.imageUrl}/>
      </div>
      <div class="col-md-8 col-lg-9">
        {moreInfo && Object.keys(moreInfo).map((key) => moreInfo[key].length ? (
          <div class="row form-group">
            <div class="col-sm-3 col-lg-2">
              {key}
            </div>
            <div class="col-sm-9 col-lg-10">
              {moreInfo[key]}
            </div>
          </div>
        ) : null)}
      </div>
    </div>
  </div>
)

export const CardView = (state: AppState, actions: AppActions) => ({match}) => (
  <div class="container" oncreate={() => actions.card.getCard({rootState: state, id: match.params.id})}>
    {!state.card.card && <LoadingSpinner/>}
    {state.card.card &&
    <div>
      <CardItem
        card={state.card.card}
        moreInfo={state.card.moreInfo}
      />
    </div>}
  </div>
)

export default CardView
