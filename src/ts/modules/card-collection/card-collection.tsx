import CardsListImages from 'components/cards/cards-list-images'
import { CardsDisplayType, default as CardsListSwitcher } from 'components/cards/cards-list-switcher'
import CardsListTable from 'components/cards/cards-list-table'
import LoadingSpinner from 'components/loading-spinner'
import AddCardForm from 'modules/card-collection/add-card-form'
import { FunctionalComponent, h } from 'preact'
import { useDispatch, useSelector } from 'react-redux'
import CardDatabaseService from 'services/card-database'
import { setCardCollectionDisplayType } from 'store/actions/card-collection-actions'
import { RootState } from 'store/reducers/root-reducers'
import { ScryCardSimple } from 'models/magic'

export const CardCollectionView: FunctionalComponent = () => {
  const dispatch = useDispatch()

  const { cards, displayType } = useSelector((state: RootState) => ({
    cards: state.cardCollectionState.cards,
    displayType: state.cardCollectionState.displayType,
  }))

  const cardsToDisplay = Object.keys(cards)
    .map((key) => cards[key])
    .filter((card) => card.count > 0)

  const setDisplayType = (displayType: CardsDisplayType) => {
    dispatch(setCardCollectionDisplayType(displayType))
  }

  const removeCardFromCollection = (card: ScryCardSimple): Promise<ScryCardSimple> =>
    CardDatabaseService.removeCardFromCollection(card)

  return (
    <div className="container">
      <figure>
        <blockquote className="blockquote">
          <p>My Collection</p>
        </blockquote>
        <figcaption className="blockquote-footer">Manage cards in your collection</figcaption>
      </figure>

      <hr />

      <figure>
        <blockquote className="blockquote">
          <p>
            Search <span className="blockquote-footer">Search for cards to add to your collection</span>
          </p>
        </blockquote>
      </figure>

      <AddCardForm />

      <hr />

      <figure>
        <blockquote className="blockquote">
          <p>
            Collection <span className="blockquote-footer">View and manage cards in your collection</span>
          </p>
        </blockquote>
      </figure>

      <div>
        {!cardsToDisplay.length && <LoadingSpinner />}
        {cardsToDisplay.length > 0 && (
          <div>
            <div className="row">
              <CardsListSwitcher className="ml-auto" setDisplayType={setDisplayType} />
            </div>
            {displayType === CardsDisplayType.List && (
              <CardsListTable cards={cardsToDisplay} decreaseCardCount={removeCardFromCollection} />
            )}
            {displayType === CardsDisplayType.Images && <CardsListImages cards={cardsToDisplay} />}
          </div>
        )}
      </div>
    </div>
  )
}

export default CardCollectionView
