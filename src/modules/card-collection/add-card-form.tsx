import { h } from 'hyperapp'
import { MagicCard } from '../../../types/magic'
import { AppActions, AppState } from '../../app'
import CardDatabaseService from '../../services/card-database'
import ManaCostView from '../card/mana-cost'

export interface AddCardFormState {
  input: string
  autocomplete: MagicCard[],
  chosenCard: any,
  // TODO
  // chosenCard: MagicCard,
}

export const initialAddCardFormState: AddCardFormState = {
  input: '',
  autocomplete: [],
  chosenCard: undefined,
}

export interface AddCardFormActions {
  handleInputChange: (input: string) => (state: AddCardFormState) => AddCardFormState,
  fetchAutocomplete: (input: string) => (state: AddCardFormState, actions: AddCardFormActions) => Promise<MagicCard[]>,
  fetchAutocompleteCommit: (autocomplete: MagicCard[]) => (state: AddCardFormState) => AddCardFormState,
  handleAutocompleteClick: (chosenCard: MagicCard) => (state: AddCardFormState) => AddCardFormState,
  addCardToCollection: (card: MagicCard) => () => any
}

export const addCardFormActions: AddCardFormActions = {
  handleInputChange: (input: string) => (state: AddCardFormState): AddCardFormState => ({
    ...state,
    input,
  }),
  fetchAutocomplete: (input: string) => async (state: AddCardFormState, actions: AddCardFormActions) => {
    const autocomplete = input
      ? await CardDatabaseService.getCardsForAutocomplete(input)
      : []
    actions.fetchAutocompleteCommit(autocomplete)
    return autocomplete
  },
  fetchAutocompleteCommit: (autocomplete) => (state: AddCardFormState) => ({ ...state, autocomplete }),
  handleAutocompleteClick: (chosenCard: MagicCard) => (state: AddCardFormState) => ({
    ...state,
    chosenCard,
    input: chosenCard.name,
    autocomplete: [],
  }),
  addCardToCollection: (card: MagicCard) => async () => {
    await CardDatabaseService.addCardToCollection(card)
  },
}

interface AddCardInputProps {
  handleInputChange: (event) => void
  autocompleteList: MagicCard[]
  handleAutocompleteClick: (card: MagicCard) => void
}

const AddCardInput = ({ handleInputChange, autocompleteList, handleAutocompleteClick }: AddCardInputProps) => (
  <div>
    <input
      type="text"
      class="form-control"
      onkeyup={handleInputChange}
    />
    {autocompleteList.length > 0 &&
    <div class="card-autocomplete-box position-absolute bg-white w-100 text-black-50 rounded">
      {autocompleteList.map((card) => (
        <div class="row" onclick={() => handleAutocompleteClick(card)}>
          <div class="col">{card.name}</div>
          <div class="col text-right">{ManaCostView(card.manaCost)}</div>
        </div>
      ))}
    </div>}
  </div>
)

interface AddCardInfoProps {
  chosenCard: MagicCard
  addCardToCollection: (card: MagicCard) => void
}

const AddCardInfo = ({ chosenCard, addCardToCollection }: AddCardInfoProps) => (
  <div class="row">
    <div class="col">
      <h3>{chosenCard.name}</h3>
      <img src={chosenCard.imageUrl}/>
      <button
        class="btn btn-primary"
        onclick={() => addCardToCollection(chosenCard)}
      >
        Add Card
      </button>
    </div>
  </div>
)

export const AddCardForm = () => (state: AppState, actions: AppActions) => {
  return (
    <div class="position-relative">
      <AddCardInput
        handleInputChange={(event) => {
          actions.cardForm.handleInputChange(event.target.value)
          actions.cardForm.fetchAutocomplete(event.target.value)
        }}
        autocompleteList={state.cardForm.autocomplete}
        handleAutocompleteClick={actions.cardForm.handleAutocompleteClick}
      />

      {state.cardForm.chosenCard &&
      <AddCardInfo chosenCard={state.cardForm.chosenCard} addCardToCollection={actions.cardForm.addCardToCollection}/>}
    </div>
  )
}

export default AddCardForm
