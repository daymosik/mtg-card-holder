import CardsListImages from 'components/cards/cards-list-images'
import { CardsDisplayType, default as CardsListSwitcher } from 'components/cards/cards-list-switcher'
import CardsListTable from 'components/cards/cards-list-table'
import LoadingSpinner from 'components/loading-spinner'
import 'firebase/auth'
import { MagicCard } from 'models/magic'
import AddCardForm from 'modules/card-collection/add-card-form'
import { FunctionalComponent, h } from 'preact'
import { useDispatch, useSelector } from 'react-redux'
import CardDatabaseService from 'services/card-database'
import { setCardCollectionDisplayType } from 'store/actions/card-collection-actions'
import { RootState } from 'store/reducers/root-reducers'

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

  const removeCardFromCollection = (card: MagicCard): Promise<MagicCard> =>
    CardDatabaseService.removeCardFromCollection(card)

  return (
    <div class="container">
      <AddCardForm />
      <div>
        {!cardsToDisplay.length && <LoadingSpinner />}
        {cardsToDisplay.length > 0 && (
          <div>
            <div class="row">
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
