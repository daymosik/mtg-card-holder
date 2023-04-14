import { FormGroup } from 'components/form'
import { useState } from 'preact/hooks'
import { FunctionalComponent, h } from 'preact'
import scryfallService from 'services/scryfall'
// import MtgApiService from 'services/mtg-api'

export const AdminView: FunctionalComponent = () => {
  const [errorMessage, changeErrorMessage] = useState('')

  const importSets = async () => {
    await scryfallService.getCard()
    // TODO
    // MtgApiService.importCards()
    handleErrorMessage('')
  }
  const importCards = async () => {
    await scryfallService.getCard()
    // TODO
    // MtgApiService.importCards()
    handleErrorMessage('')
  }

  const handleErrorMessage = (message: string) => {
    changeErrorMessage(message)
  }

  return (
    <div className="container">
      <h2>Administration</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <FormGroup label={'Import sets'}>
          <button className="btn btn-primary form-control" onClick={importSets}>
            Import
          </button>
        </FormGroup>

        <FormGroup label={'Import cards'}>
          <button className="btn btn-primary form-control" onClick={importCards}>
            Import
          </button>
        </FormGroup>
      </form>
    </div>
  )
}

export default AdminView
