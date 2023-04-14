import CardsListImages from 'components/cards/cards-list-images'
import CardsListSwitcher, { CardsDisplayType } from 'components/cards/cards-list-switcher'
import CardsListTable from 'components/cards/cards-list-table'
import LoadingSpinner from 'components/loading-spinner'
import { MagicCard, MagicSet } from 'models/magic'
import { useEffect, useState } from 'preact/hooks'
import CardDatabaseService from 'services/card-database'
import { FunctionalComponent, h } from 'preact'

export interface SetViewProps {
  matches: {
    code: string
  }
}

export const SetView: FunctionalComponent<SetViewProps> = ({ matches }) => {
  const [set, changeSet] = useState<MagicSet | undefined>(undefined)
  const [cards, changeCards] = useState<MagicCard[]>([])
  const [displayType, changeDisplayType] = useState<CardsDisplayType>(CardsDisplayType.List)

  const setDisplayType = (type: CardsDisplayType) => {
    changeDisplayType(type)
  }

  const initializeView = async (setId: string): Promise<void> => {
    await Promise.all([CardDatabaseService.getCardsBySet(setId), CardDatabaseService.getSet(setId)]).then(
      ([cards, set]) => {
        changeCards(cards)
        changeSet(set)
      },
    )
  }

  useEffect(() => {
    void initializeView(matches.code)
  }, [matches.code])

  return (
    <div className="container">
      {!set && <LoadingSpinner />}
      {set && (
        <div>
          <div className="row">
            <h1>
              <i className={`m-3 ss ss-${set.code.toLowerCase()}`} /> {set.name}
            </h1>
            <CardsListSwitcher className="ml-auto pt-sm-3" setDisplayType={setDisplayType} />
          </div>
          {cards.length > 0 && (
            <div>
              {displayType === CardsDisplayType.List && <CardsListTable cards={cards} />}
              {displayType === CardsDisplayType.Images && <CardsListImages cards={cards} />}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SetView
