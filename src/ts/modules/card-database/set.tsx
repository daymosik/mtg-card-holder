import CardsListImages from 'components/cards/cards-list-images'
import CardsListSwitcher, { CardsDisplayType } from 'components/cards/cards-list-switcher'
import CardsListTable from 'components/cards/cards-list-table'
import LoadingSpinner from 'components/loading-spinner'
import { ScrySet } from 'models/magic'
import { useEffect, useState } from 'preact/hooks'
import CardDatabaseService from 'services/card-database'
import { Fragment, FunctionalComponent, h } from 'preact'
import { ScryCardSimple } from 'models/magic'

export interface SetViewProps {
  matches: {
    code: string
  }
}

export const SetView: FunctionalComponent<SetViewProps> = ({ matches }) => {
  const [set, changeSet] = useState<ScrySet | undefined>(undefined)
  const [cards, changeCards] = useState<ScryCardSimple[]>([])
  const [displayType, changeDisplayType] = useState<CardsDisplayType>(CardsDisplayType.List)

  const setDisplayType = (type: CardsDisplayType) => {
    changeDisplayType(type)
  }

  const initializeView = async (setId: string): Promise<void> => {
    await Promise.all([CardDatabaseService.getCardsBySet(setId), CardDatabaseService.getSet(setId)]).then(
      ([cards, set]) => {
        console.log({ cards, set })
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
        <Fragment>
          <figure>
            <blockquote className="blockquote">
              <p>
                <i className={`me-2 ss ss-2x ss-${set.code.toLowerCase()}`} /> {set.name}
              </p>
            </blockquote>
            <figcaption className="blockquote-footer">{set.block}</figcaption>
          </figure>
          <hr />
          <CardsListSwitcher className="ml-auto" setDisplayType={setDisplayType} />
          {cards.length > 0 && (
            <div>
              {displayType === CardsDisplayType.List && <CardsListTable cards={cards} />}
              {displayType === CardsDisplayType.Images && <CardsListImages cards={cards} />}
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}

export default SetView
