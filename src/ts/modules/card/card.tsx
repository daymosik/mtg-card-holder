import { appActions, AppState } from '@app'
import LoadingSpinner from '@components/loading-spinner'
import Tooltip from '@components/tooltip'
import { MagicCard, MagicCardMoreInfo } from '@models/magic'
import { MatchProps } from '@services/location'
import { h } from 'hyperapp'

export interface CardState {
  card: MagicCard | undefined
  moreInfo: MagicCardMoreInfo | undefined
  cardCount: number
}

export const initialCardState: CardState = {
  card: undefined,
  moreInfo: undefined,
  cardCount: 0,
}

export interface CardActions {
  getCardCommit: (state: AppState, array) => AppState
}

export const cardActions: CardActions = {
  getCardCommit: (state, [card, moreInfo, cardCount]) => ({
    ...state,
    card: {
      ...state.card,
      card,
      moreInfo,
      cardCount,
    },
  }),
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

interface MoreInfoProps {
  moreInfo: MagicCardMoreInfo | undefined
}

const MoreInfo = ({ moreInfo }: MoreInfoProps) => {
  if (!moreInfo) {
    return null
  }
  return Object.keys(moreInfo).map((key: keyof MagicCardMoreInfo) => moreInfo[key] ? (
    <div class="row form-group">
      <div class="col-sm-3 col-lg-2">
        {key}
      </div>
      <div class="col-sm-9 col-lg-10">
        {/*TODO*/}
        {/*{handleMoreInfoDetails(key, moreInfo[key])}*/}
      </div>
    </div>
  ) : null)
}

interface CardItemProps {
  card: MagicCard
  moreInfo: MagicCardMoreInfo | undefined,
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
        <MoreInfo moreInfo={moreInfo}/>
      </div>
    </div>
  </div>
)

export const CardView = (state: AppState & MatchProps) => {
  const event = new CustomEvent('init-card-view', { detail: state.params.id })
  if (!state.card.card || state.card.card.id !== state.params.id) {
    dispatchEvent(event)
  }

  return (
    <div class="container">
      {!state.card.card && <LoadingSpinner/>}
      {state.card.card &&
      <CardItem
        card={state.card.card}
        moreInfo={state.card.moreInfo}
        cardCount={state.card.cardCount}
      />}
    </div>
  )
}

export default CardView
