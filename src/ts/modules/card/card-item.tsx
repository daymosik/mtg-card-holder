import CardMoreInfo from 'modules/card/card-more-info'
import { FunctionalComponent, h } from 'preact'
import Tooltip from 'components/tooltip'
import {
  ScryCard,
  ScryCardKeys,
  ScryCardSimple,
  ScryCardSimpleKeys,
  ScryCardSimpleValues,
  ScryCardValues,
} from 'models/magic'
import ManaCostView from 'components/card/mana-cost'
import { cardUtils } from 'utils/utils'

export interface CardItemProps {
  card: ScryCardSimple
  moreInfo: ScryCard | undefined
  cardCount: number
}

export const CardItem: FunctionalComponent<CardItemProps> = ({ card, moreInfo, cardCount }) => {
  const imageUrl = card.image_uris?.normal
  return (
    <div>
      <div className="card bg-dark bg-opacity-75 mb-4 rounded-3 text-light">
        <div className="card-body p-3">
          <figure>
            <blockquote className="blockquote d-flex">
              <div>{card.name}</div>
              <div className="ms-auto">{ManaCostView(card.mana_cost)}</div>
            </blockquote>
            <figcaption className="blockquote-footer">{moreInfo?.flavor_text}</figcaption>
          </figure>

          <div className="d-sm-flex gap-md-5">
            <div style={{ flexBasis: '265px' }}>
              <div className="cards-list-image m-2">
                {imageUrl ? <img alt="Card" src={imageUrl} style={{ width: '100%' }} /> : <i className="fas fa-ban" />}
              </div>
            </div>

            <div className="flex-grow-1 pt-2">
              <blockquote className="blockquote d-flex align-items-center">
                {card.type_line}{' '}
                <Tooltip title={moreInfo?.set_name || card.set}>
                  <i className={`ms-3 ss ss-2x ss-${card.set.toLowerCase()}`} />
                </Tooltip>
              </blockquote>
              <figcaption className="blockquote-footer">{moreInfo?.oracle_text}</figcaption>

              <blockquote className="blockquote">
                <Tooltip title={`Card count: ${cardCount}`}>
                  <div className="badge bg-info">{cardCount}</div>
                </Tooltip>
              </blockquote>

              <div className="text-light">
                {(['rarity', 'set_type', 'artist', 'released_at'] as ScryCardSimpleKeys[] | ScryCardKeys[]).map(
                  (key) => {
                    const keyo = key
                    const info: ScryCardSimpleValues | ScryCardValues =
                      (moreInfo && moreInfo[keyo]) || card[keyo as ScryCardSimpleKeys]

                    return (
                      <div className="row" key={JSON.stringify(key)}>
                        <div className="col-sm-4">{cardUtils.displayKey(key)}:</div>
                        <div className="col-sm-8">{info}</div>
                      </div>
                    )
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-dark bg-opacity-75 mb-4 rounded-3">
        <div className="card-body p-3">
          <CardMoreInfo moreInfo={moreInfo} />
        </div>
      </div>
    </div>
  )
}
