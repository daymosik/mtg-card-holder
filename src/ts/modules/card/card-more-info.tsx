import ManaColorImage from 'components/card/mana-color-image'
import { ScryCardKeys, ScryCardValues, ScryLegalities } from 'models/magic'
import { FunctionalComponent, h } from 'preact'
import { ScryCard } from 'models/magic'
import { cardUtils } from 'utils/utils'

const hiddenKeys: ScryCardKeys[] = ['multiverse_ids', 'cmc']

const handleMoreInfoDetails = (key: ScryCardKeys, value: ScryCardValues) => {
  switch (key) {
    // TODO
    // case 'printings':
    //   return (
    //     <div className="h2">
    //       {(value as string[]).map((set) => (
    //         <Tooltip title={set} key={set}>
    //           <i className={`m-2 ss ss-${set.toLowerCase()}`} />
    //         </Tooltip>
    //       ))}
    //     </div>
    //   )
    case 'color_identity':
      return (
        <div>
          {(value as string[]).map((color) => (
            <ManaColorImage key={`${color}`} color={color} />
          ))}
        </div>
      )
    // case 'originalText':
    // case 'text':
    //   return <div dangerouslySetInnerHTML={{ __html: value as string }} style={{ whiteSpace: 'pre-line' }} />
    // case 'rulings':
    //   return (
    //     <div>
    //       {(value as MagicCardMoreInfoRulings[]).map((ruling) => (
    //         <div key={ruling.date}>
    //           {ruling.date} - {ruling.text}
    //         </div>
    //       ))}
    //     </div>
    //   )
    case 'legalities':
      return (
        <div>
          {Object.entries(value as ScryLegalities).map(([key, value]) => (
            <div key={key}>
              {key} - {value}
            </div>
          ))}
        </div>
      )
    default:
      return <span>{JSON.stringify(value)}</span>
  }
}

export interface CardMoreInfoProps {
  moreInfo: ScryCard | undefined
}

const CardMoreInfo: FunctionalComponent<CardMoreInfoProps> = ({ moreInfo }): JSX.Element => {
  if (!moreInfo) {
    return <div />
  }
  return (
    <div className="list-group list-group-flush">
      {Object.keys(moreInfo)
        .filter((k) => !hiddenKeys.includes(k as ScryCardKeys))
        .map((key) => {
          const keyo = key as ScryCardKeys
          const info: ScryCardValues = moreInfo[keyo]

          return info ? (
            <div className="list-group-item bg-transparent text-light" key={JSON.stringify(key)}>
              <small>{cardUtils.displayKey(key)}:</small>
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
