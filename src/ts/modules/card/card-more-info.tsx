import ManaColorImage from 'components/card/mana-color-image'
import { ScryCardKeys, ScryCardValues, ScryLegalities } from 'models/magic'
import { FunctionalComponent, h } from 'preact'
import { ScryCard } from 'models/magic'
import { cardUtils } from 'utils/utils'

const ids: ScryCardKeys[] = [
  'artist_ids',
  'card_back_id',
  'cardmarket_id',
  'mtgo_foil_id',
  'mtgo_id',
  'tcgplayer_id',
  'oracle_id',
  'id',
  'illustration_id',
  'set_id',
  'arena_id',
]

// const uriKeys: ScryCardKeys[] = ['image_uris', 'card_faces']

const hiddenKeys: ScryCardKeys[] = [
  ...ids,
  'multiverse_ids',
  'cmc',
  'flavor_text',
  'mana_cost',
  'name',
  'power',
  'toughness',
  'type_line',
  'oracle_text',
  'set',
  'set_name',
  'set_type',
  'rarity',
  'artist',
  'released_at',
]

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
    case 'related_uris':
    case 'purchase_uris':
    case 'image_uris':
      return (
        <div>
          {Object.entries(value as Record<string, string>).map(([key, value]) => (
            <div key={key}>
              <a href={value} target="_blank" rel="noreferrer">
                {key}
              </a>
            </div>
          ))}
        </div>
      )
    case 'prices':
      return (
        <div>
          {Object.entries(value as Record<string, number>).map(([key, value]) => (
            <div key={key}>
              {key} - {value}
            </div>
          ))}
        </div>
      )
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
      return typeof value === 'object' ? (
        JSON.stringify(value)
      ) : typeof value === 'string' ? (
        value.startsWith('http') ? (
          <a href={value} target="_blank" rel="noreferrer">
            {value}
          </a>
        ) : (
          value
        )
      ) : (
        value?.toString()
      )
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
