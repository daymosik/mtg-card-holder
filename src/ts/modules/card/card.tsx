import LoadingSpinner from 'components/loading-spinner'
import { MagicCard, MagicCardMoreInfo } from 'models/magic'
import CardMoreInfo from 'modules/card/card-more-info'
import { useEffect, useState } from 'preact/hooks'
import CardDatabaseService from 'services/card-database'
import { FunctionalComponent, h } from 'preact'

export interface CardItemProps {
  card: MagicCard
  moreInfo: MagicCardMoreInfo | undefined
  cardCount: number
}

const CardItem: FunctionalComponent<CardItemProps> = ({ card, moreInfo, cardCount }) => (
  <div>
    <h1>{card.name}</h1>
    <div class="row">
      <div class="col-md-4 col-lg-3">
        <div class="cards-list-image rounded m-2">
          {card.imageUrl ? <img src={card.imageUrl} /> : <i class="fas fa-ban" />}
        </div>
      </div>
      <div class="col-md-8 col-lg-9">
        <div class="row form-group">
          <div class="col-sm-3 col-lg-2">Card count:</div>
          <div class="col-sm-9 col-lg-10">{cardCount}</div>
        </div>
        <hr />
        <CardMoreInfo card={card} moreInfo={moreInfo} />
      </div>
    </div>
  </div>
)

export interface CardViewProps {
  matches: {
    id: string
  }
}

export const CardView: FunctionalComponent<CardViewProps> = ({ matches }) => {
  const [card, setCard] = useState<MagicCard | undefined>(undefined)
  const [moreInfo, setCardMoreInfo] = useState<MagicCardMoreInfo | undefined>(undefined)
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

  useEffect(() => {
    void initializeView(matches.id)
  }, [matches.id])

  return (
    <div class="container">
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
