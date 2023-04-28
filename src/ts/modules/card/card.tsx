import LoadingSpinner from 'components/loading-spinner'
import CardInfo from 'modules/card/card-info'
import CardMoreInfo from 'modules/card/card-more-info'
import { useEffect, useState } from 'preact/hooks'
import CardDatabaseService from 'services/card-database'
import { FunctionalComponent, h } from 'preact'
import Tooltip from 'components/tooltip'
import { ScryCard, ScryCardSimple } from 'models/magic'

export interface CardItemProps {
  card: ScryCardSimple
  moreInfo: ScryCard | undefined
  cardCount: number
}

const CardItem: FunctionalComponent<CardItemProps> = ({ card, moreInfo, cardCount }) => {
  const imageUrl = card.image_uris?.small
  return (
    <div>
      <div className="card bg-dark mb-4" style={{ borderRadius: '1rem' }}>
        <div className="card-header d-flex align-items-center">
          <h4 className="m-0">{card.name}</h4>

          <div className="ms-auto">
            <Tooltip title={`Card count: ${cardCount}`}>
              <div className="badge bg-info">{cardCount}</div>
            </Tooltip>
          </div>
        </div>
        <div className="card-body p-3">
          <div className="d-sm-flex gap-md-5">
            <div style={{ flexBasis: '265px' }}>
              <div className="cards-list-image rounded m-2">
                {imageUrl ? <img src={imageUrl} /> : <i className="fas fa-ban" />}
              </div>
            </div>

            <div className="flex-grow-1">
              <CardInfo card={card} />
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-dark mb-4" style={{ borderRadius: '1rem' }}>
        <div className="card-body p-3">
          <CardMoreInfo moreInfo={moreInfo} />
        </div>
      </div>
    </div>
  )
}

export interface CardViewProps {
  matches: {
    id: string
  }
}

export const CardView: FunctionalComponent<CardViewProps> = ({ matches }) => {
  const [card, setCard] = useState<ScryCardSimple | undefined>(undefined)
  const [moreInfo, setCardMoreInfo] = useState<ScryCard | undefined>(undefined)
  const [cardCount, setCardCount] = useState<number>(0)

  const initializeView = async (cardId: string): Promise<void> => {
    await Promise.all([
      CardDatabaseService.getCardById(cardId),
      CardDatabaseService.getCardMoreInfo(cardId),
      CardDatabaseService.getUserCardCount(cardId),
    ]).then(([card, moreInfo, cardCount]) => {
      setCard(card)
      setCardMoreInfo(moreInfo)
      setCardCount(cardCount)
    })
  }

  console.log({ card, moreInfo, cardCount })

  useEffect(() => {
    void initializeView(matches.id)
  }, [matches.id])

  return (
    <div className="container-md">
      {!card && <LoadingSpinner />}
      {card && (
        <div>
          <CardItem card={card} moreInfo={moreInfo} cardCount={cardCount} />
        </div>
      )}
    </div>
  )
}

export default CardView
