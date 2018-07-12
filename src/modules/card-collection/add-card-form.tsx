import { h } from 'hyperapp'
import { MagicCard } from '../../../types/magic'
import { AppActions, AppState } from '../../app'
import ManaCostView from '../card/mana-cost'
import CardDatabaseService from '../../services/card-database'

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

export const AddCardForm = () => (state: AppState, actions: AppActions) => {
  return (
    <div class="position-relative">
      <input
        type="text"
        class="form-control"
        onkeyup={(event) => {
          actions.cardForm.handleInputChange(event.target.value)
          actions.cardForm.fetchAutocomplete(event.target.value)
        }}
      />
      {state.cardForm.autocomplete.length > 0 &&
      <div class="card-autocomplete-box position-absolute bg-white w-100 text-black-50 rounded">
        {state.cardForm.autocomplete.map((card) => (
          <div class="row" onclick={() => actions.cardForm.handleAutocompleteClick(card)}>
            <div class="col">{card.name}</div>
            <div class="col text-right">{ManaCostView(card.manaCost)}</div>
          </div>
        ))}
      </div>}

      {state.cardForm.chosenCard &&
      <div class="row">
        <div class="col">

          <h3>{state.cardForm.chosenCard.name}</h3>
          <img src={state.cardForm.chosenCard.imageUrl}/>

          <button
            class="btn btn-primary"
            onclick={() => actions.cardForm.addCardToCollection(state.cardForm.chosenCard)}
          >
            Add Card
          </button>
        </div>
      </div>}
    </div>
  )
}

export default AddCardForm
