import ManaCostView from 'components/card/mana-cost'
import { useState } from 'preact/hooks'
import { JSXInternal } from 'preact/src/jsx'
import CardDatabaseService from 'services/card-database'
import { FunctionalComponent, h } from 'preact'
import { ScryCardSimple } from 'models/magic'

interface AddCardInputProps {
  value: string
  handleInputChange: JSXInternal.GenericEventHandler<HTMLInputElement>
  autocompleteList: ScryCardSimple[]
  handleAutocompleteClick: (card: ScryCardSimple) => void
}

const AddCardInput: FunctionalComponent<AddCardInputProps> = ({
  value,
  handleInputChange,
  autocompleteList,
  handleAutocompleteClick,
}) => (
  <div>
    <input type="text" className="form-control" value={value} onInput={handleInputChange} />
    {autocompleteList.length > 0 && (
      <div className="card-autocomplete-box position-absolute bg-white w-100 text-black-50 rounded-3">
        {autocompleteList.map((card) => (
          <div className="row" key={card.id} onClick={() => handleAutocompleteClick(card)}>
            <div className="col">
              <div className="p-1 border-bottom d-flex">
                <div>{card.name}</div> <div className="ms-auto">{ManaCostView(card.mana_cost)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)

interface AddCardInfoProps {
  chosenCard: ScryCardSimple
  addCardToCollection: (card: ScryCardSimple) => void
}

const AddCardInfo: FunctionalComponent<AddCardInfoProps> = ({ chosenCard, addCardToCollection }) => {
  const imageUrl = chosenCard.image_uris?.small
  return (
    <div className="pt-3">
      <figure>
        <blockquote className="blockquote d-flex">
          <div>
            <div>{chosenCard.name}</div>
            <div className="ms-auto">{ManaCostView(chosenCard.mana_cost)}</div>
          </div>
          <div className="ms-auto">
            <button className="btn btn-primary" onClick={() => addCardToCollection(chosenCard)}>
              Add to Collection
            </button>
          </div>
        </blockquote>
        <figcaption className="blockquote-footer">{chosenCard.type_line}</figcaption>
      </figure>

      <div className="cards-list-image m-2">
        {imageUrl ? <img alt="Card" src={imageUrl} style={{ width: '100%' }} /> : <i className="fas fa-ban" />}
      </div>
    </div>
  )
}

export const AddCardForm: FunctionalComponent = () => {
  const [input, changeInput] = useState('')
  const [autocomplete, changeAutocomplete] = useState<ScryCardSimple[]>([])
  const [chosenCard, changeChosenCard] = useState<ScryCardSimple | undefined>(undefined)

  const handleAutocompleteClick = (chosenCard: ScryCardSimple) => {
    changeInput(chosenCard.name)
    changeChosenCard(chosenCard)
    changeAutocomplete([])
  }

  const addCardToCollection = (card: ScryCardSimple): Promise<ScryCardSimple> => {
    // TODO: add prompt
    return CardDatabaseService.addCardToCollection(card)
  }

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
    <div className="position-relative">
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
