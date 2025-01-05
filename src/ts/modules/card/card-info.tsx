import ManaColorImage from 'components/card/mana-color-image'
import ManaCostView from 'components/card/mana-cost'
import Tooltip from 'components/tooltip'
import { ScryCardSimpleKeys, ScryCardSimpleValues } from 'models/magic'
import { FunctionalComponent, h } from 'preact'
import { ScryCardSimple } from 'models/magic'
import { cardUtils } from 'utils/utils'

const hiddenKeys: ScryCardSimpleKeys[] = ['id', 'name', 'image_uris']

const handleCardDetails = (key: ScryCardSimpleKeys, value: ScryCardSimpleValues) => {
  switch (key) {
    case 'mana_cost':
      return <div>{ManaCostView(value as string)}</div>
    case 'colors':
      return (
        <div>
          {(value as string[]).map((color) => (
            <ManaColorImage key={`${color}`} color={color} />
          ))}
        </div>
      )
    case 'set':
      return (
        <div className="h2">
          <Tooltip title={value as string}>
            <i className={`m-2 ss ss-${(value as string).toLowerCase()}`} />
          </Tooltip>
        </div>
      )
    default:
      return <span>{JSON.stringify(value)}</span>
  }
}

export interface CardInfoProps {
  card: ScryCardSimple
}

const CardInfo: FunctionalComponent<CardInfoProps> = ({ card }): JSX.Element => {
  return (
    <div className="text-light">
      {Object.keys(card)
        .filter((k) => !hiddenKeys.includes(k as ScryCardSimpleKeys))
        .map((key) => {
          const keyo = key as ScryCardSimpleKeys
          const info: ScryCardSimpleValues = card[keyo]

          return (
            <div className="row form-group" key={JSON.stringify(key)}>
              <div className="col-sm-3">{cardUtils.displayKey(key)}:</div>
              <div className="col-sm-9">{handleCardDetails(keyo, info)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default CardInfo
