import ManaColorImage from 'components/card/mana-color-image'
import Tooltip from 'components/tooltip'
import {
  MagicCardMoreInfo,
  MagicCardMoreInfoKeys,
  MagicCardMoreInfoLegalities,
  MagicCardMoreInfoRulings,
  MagicCardMoreInfoValues,
} from 'models/magic'
import { FunctionalComponent, h } from 'preact'

const hiddenKeys: MagicCardMoreInfoKeys[] = ['multiverseid', 'cmc']

const handleMoreInfoDetails = (key: MagicCardMoreInfoKeys, value: MagicCardMoreInfoValues) => {
  switch (key) {
    case 'printings':
      return (
        <div className="h2">
          {(value as string[]).map((set) => (
            <Tooltip title={set} key={set}>
              <i className={`m-2 ss ss-${set.toLowerCase()}`} />
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
    case 'originalText':
    case 'text':
      return <div dangerouslySetInnerHTML={{ __html: value as string }} style={{ whiteSpace: 'pre-line' }} />
    case 'rulings':
      return (
        <div>
          {(value as MagicCardMoreInfoRulings[]).map((ruling) => (
            <div key={ruling.date}>
              {ruling.date} - {ruling.text}
            </div>
          ))}
        </div>
      )
    case 'legalities':
      return (
        <div>
          {(value as MagicCardMoreInfoLegalities[]).map((legality) => (
            <div key={legality.format}>
              {legality.format} - {legality.legality}
            </div>
          ))}
        </div>
      )
    default:
      return <span>{JSON.stringify(value)}</span>
  }
}

export interface CardMoreInfoProps {
  moreInfo: MagicCardMoreInfo | undefined
}

const CardMoreInfo: FunctionalComponent<CardMoreInfoProps> = ({ moreInfo }): JSX.Element => {
  if (!moreInfo) {
    return <div />
  }
  return (
    <div className="list-group list-group-flush">
      {Object.keys(moreInfo)
        .filter((k) => !hiddenKeys.includes(k as MagicCardMoreInfoKeys))
        .map((key) => {
          const keyo = key as MagicCardMoreInfoKeys
          const info: MagicCardMoreInfoValues = moreInfo[keyo]

          return info ? (
            <div className="list-group-item bg-transparent text-light" key={JSON.stringify(key)}>
              <small>{key}:</small>
              <p className="fs-6">{handleMoreInfoDetails(keyo, info)}</p>
            </div>
          ) : (
            <div />
          )
        })}
    </div>
  )
}

export default CardMoreInfo
