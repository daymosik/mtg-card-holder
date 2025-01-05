import CardInfo from 'modules/card/card-info'
import CardMoreInfo from 'modules/card/card-more-info'
import { FunctionalComponent, h } from 'preact'
import Tooltip from 'components/tooltip'
import { ScryCard, ScryCardSimple } from 'models/magic'

export interface CardItemProps {
  card: ScryCardSimple
  moreInfo: ScryCard | undefined
  cardCount: number
}

export const CardItem: FunctionalComponent<CardItemProps> = ({ card, moreInfo, cardCount }) => {
  const imageUrl = card.image_uris?.normal
  return (
    <div>
      <div className="card bg-dark bg-opacity-75 mb-4" style={{ borderRadius: '1rem' }}>
        <div className="card-header d-flex align-items-center">
          <h4 className="m-0 text-light">{card.name}</h4>

          <div className="ms-auto">
            <Tooltip title={`Card count: ${cardCount}`}>
              <div className="badge bg-info">{cardCount}</div>
            </Tooltip>
          </div>
        </div>
        <div className="card-body p-3">
          <div className="d-sm-flex gap-md-5">
            <div style={{ flexBasis: '265px' }}>
              <div className="cards-list-image m-2">
                {imageUrl ? <img alt="Card" src={imageUrl} style={{ width: '100%' }} /> : <i className="fas fa-ban" />}
              </div>
            </div>

            <div className="flex-grow-1">
              <CardInfo card={card} />
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-dark bg-opacity-75 mb-4" style={{ borderRadius: '1rem' }}>
        <div className="card-body p-3">
          <CardMoreInfo moreInfo={moreInfo} />
        </div>
      </div>
    </div>
  )
}
