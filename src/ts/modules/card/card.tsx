import LoadingSpinner from 'components/loading-spinner'
import { useEffect, useState } from 'preact/hooks'
import CardDatabaseService from 'services/card-database'
import { FunctionalComponent, h } from 'preact'
import { ScryCard, ScryCardSimple } from 'models/magic'
import { CardItem } from 'modules/card/card-item'

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
