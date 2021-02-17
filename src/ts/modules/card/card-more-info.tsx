import ManaColorImage from 'components/card/mana-color-image'
import ManaCostView from 'components/card/mana-cost'
import Tooltip from 'components/tooltip'
import {
  MagicCard,
  MagicCardKeys,
  MagicCardMoreInfo,
  MagicCardMoreInfoKeys,
  MagicCardMoreInfoValues,
  MagicCardValues,
} from 'models/magic'
import { FunctionalComponent, h } from 'preact'

const handleCardDetails = (key: MagicCardKeys, value: MagicCardValues) => {
  switch (key) {
    case 'manaCost':
      return <div>{ManaCostView(value as string)}</div>
    default:
      return <span>{JSON.stringify(value)}</span>
  }
}

const handleMoreInfoDetails = (key: MagicCardMoreInfoKeys, value: MagicCardMoreInfoValues) => {
  switch (key) {
    case 'printings':
      return (
        <div class="h2">
          {(value as string[]).map((set) => (
            <Tooltip title={set} key={set}>
              <i class={`m-2 ss ss-${set.toLowerCase()}`} />
            </Tooltip>
          ))}
        </div>
      )
    case 'colorIdentity':
      return (
        <div>
          {(value as string[]).map((color) => (
            <ManaColorImage key={`${color}`} color={color} />
          ))}
        </div>
      )
    default:
      return <span>{JSON.stringify(value)}</span>
  }
}

export interface CardMoreInfoProps {
  card: MagicCard
  moreInfo: MagicCardMoreInfo | undefined
}

const CardMoreInfo: FunctionalComponent<CardMoreInfoProps> = ({ card, moreInfo }): JSX.Element => {
  if (!moreInfo) {
    return <div />
  }
  return (
    <div>
      {Object.keys(card).map((key) => {
        const keyo = key as MagicCardKeys
        const info: MagicCardValues = card[keyo]

        return (
          <div className="row form-group" key={JSON.stringify(key)}>
            <div className="col-sm-3 col-lg-2">{JSON.stringify(key)}</div>
            <div className="col-sm-9 col-lg-10">{handleCardDetails(keyo, info)}</div>
          </div>
        )
      })}

      {Object.keys(moreInfo).map((key) => {
        const keyo = key as MagicCardMoreInfoKeys
        const info: MagicCardMoreInfoValues = moreInfo[keyo]

        return info ? (
          <div class="row form-group" key={JSON.stringify(key)}>
            <div class="col-sm-3 col-lg-2">{JSON.stringify(key)}</div>
            <div class="col-sm-9 col-lg-10">{handleMoreInfoDetails(keyo, info)}</div>
          </div>
        ) : (
          <div />
        )
      })}
    </div>
  )
}

export default CardMoreInfo
