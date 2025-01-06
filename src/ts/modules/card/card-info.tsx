import ManaColorImage from 'components/card/mana-color-image'
import Tooltip from 'components/tooltip'
import { ScryCardSimpleKeys, ScryCardSimpleValues } from 'models/magic'
import { FunctionalComponent, h } from 'preact'
import { ScryCardSimple } from 'models/magic'
import { cardUtils } from 'utils/utils'

const hiddenKeys: ScryCardSimpleKeys[] = ['id', 'name', 'image_uris', 'mana_cost', 'type_line', 'set', 'colors']

const handleCardDetails = (key: ScryCardSimpleKeys, value: ScryCardSimpleValues) => {
  switch (key) {
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
        <Tooltip title={value as string}>
          <i className={`ss ss-3x ss-${(value as string).toLowerCase()}`} />
        </Tooltip>
      )
    default:
      return <span>{value}</span>
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
            <div className="row" key={JSON.stringify(key)}>
              <div className="col-sm-4">{cardUtils.displayKey(key)}:</div>
              <div className="col-sm-8">{handleCardDetails(keyo, info)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default CardInfo
