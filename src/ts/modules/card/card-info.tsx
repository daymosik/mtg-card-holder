import ManaColorImage from 'components/card/mana-color-image'
import ManaCostView from 'components/card/mana-cost'
import Tooltip from 'components/tooltip'
import { MagicCard, MagicCardKeys, MagicCardValues } from 'models/magic'
import { FunctionalComponent, h } from 'preact'

const hiddenKeys: MagicCardKeys[] = ['imageUrl', 'id']

const handleCardDetails = (key: MagicCardKeys, value: MagicCardValues) => {
  switch (key) {
    case 'manaCost':
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
        <div class="h2">
          <Tooltip title={value as string}>
            <i class={`m-2 ss ss-${(value as string).toLowerCase()}`} />
          </Tooltip>
        </div>
      )
    default:
      return <span>{JSON.stringify(value)}</span>
  }
}

export interface CardInfoProps {
  card: MagicCard
}

const CardInfo: FunctionalComponent<CardInfoProps> = ({ card }): JSX.Element => {
  return (
    <div>
      {Object.keys(card)
        .filter((k) => !hiddenKeys.includes(k as MagicCardKeys))
        .map((key) => {
          const keyo = key as MagicCardKeys
          const info: MagicCardValues = card[keyo]

          return (
            <div className="row form-group" key={JSON.stringify(key)}>
              <div className="col-sm-3 col-lg-2">{key}:</div>
              <div className="col-sm-9 col-lg-10">{handleCardDetails(keyo, info)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default CardInfo
