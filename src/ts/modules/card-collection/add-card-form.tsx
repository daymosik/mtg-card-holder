import ManaCostView from 'components/card/mana-cost'
import { MagicCard } from 'models/magic'
import { useState } from 'preact/hooks'
import { JSXInternal } from 'preact/src/jsx'
import CardDatabaseService from 'services/card-database'
import { FunctionalComponent, h } from 'preact'

interface AddCardInputProps {
  value: string
  handleInputChange: JSXInternal.GenericEventHandler<HTMLInputElement>
  autocompleteList: MagicCard[]
  handleAutocompleteClick: (card: MagicCard) => void
}

const AddCardInput: FunctionalComponent<AddCardInputProps> = ({
  value,
  handleInputChange,
  autocompleteList,
  handleAutocompleteClick,
}) => (
  <div>
    <input type="text" class="form-control" value={value} onInput={handleInputChange} />
    {autocompleteList.length > 0 && (
      <div class="card-autocomplete-box position-absolute bg-white w-100 text-black-50 rounded">
        {autocompleteList.map((card) => (
          <div class="row" key={card.id} onClick={() => handleAutocompleteClick(card)}>
            <div class="col">
              <div class="p-1 border-bottom d-flex">
                <div>{card.name}</div>
                <div class="ml-auto">{ManaCostView(card.manaCost)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)

interface AddCardInfoProps {
  chosenCard: MagicCard
  addCardToCollection: (card: MagicCard) => void
}

const AddCardInfo: FunctionalComponent<AddCardInfoProps> = ({ chosenCard, addCardToCollection }) => (
  <div class="row">
    <div class="col">
      <h3>{chosenCard.name}</h3>
      <img src={chosenCard.imageUrl} />
      <button class="btn btn-primary" onClick={() => addCardToCollection(chosenCard)}>
        Add Card
      </button>
    </div>
  </div>
)

export const AddCardForm: FunctionalComponent = () => {
  const [input, changeInput] = useState('')
  const [autocomplete, changeAutocomplete] = useState<MagicCard[]>([])
  const [chosenCard, changeChosenCard] = useState<MagicCard | undefined>(undefined)

  const handleAutocompleteClick = (chosenCard: MagicCard) => {
    changeInput(chosenCard.name)
    changeChosenCard(chosenCard)
    changeAutocomplete([])
  }

  const addCardToCollection = (card: MagicCard): Promise<MagicCard> => CardDatabaseService.addCardToCollection(card)

  const handleInputChange = async (event: JSXInternal.TargetedEvent<HTMLInputElement>): Promise<void> => {
    const value = (event.target as HTMLInputElement).value
    changeInput(value)
    await fetchAutocomplete(value)
  }

  const fetchAutocomplete = async (input: string) => {
    const autocomplete = input ? await CardDatabaseService.getCardsForAutocomplete(input) : []
    changeAutocomplete(autocomplete)
  }

  return (
    <div class="position-relative">
      <AddCardInput
        value={input}
        handleInputChange={handleInputChange}
        autocompleteList={autocomplete}
        handleAutocompleteClick={handleAutocompleteClick}
      />

      {chosenCard && <AddCardInfo chosenCard={chosenCard} addCardToCollection={addCardToCollection} />}
    </div>
  )
}

export default AddCardForm
