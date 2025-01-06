import { useState } from 'preact/hooks'
import { FunctionalComponent, h } from 'preact'
import scryfallService from 'services/scryfall'

export const AdminView: FunctionalComponent = () => {
  const [errorMessage, changeErrorMessage] = useState('')

  const importSetsScry = async (): Promise<void> => {
    await scryfallService.importSets()
    handleErrorMessage('')
  }

  const importCardsScry = async (): Promise<void> => {
    await scryfallService.importCards()
    handleErrorMessage('')
  }

  const importCardsScryForce = async (): Promise<void> => {
    await scryfallService.importCards(true)
    handleErrorMessage('')
  }

  const handleErrorMessage = (message: string) => {
    changeErrorMessage(message)
  }

  return (
    <div className="container">
      <figure>
        <blockquote className="blockquote">
          <p>Administration</p>
        </blockquote>
        <figcaption className="blockquote-footer">Manage the database</figcaption>
      </figure>

      <hr />

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4 bg-dark border-0 rounded-3 overflow-hidden">
            <div className="card-header bg-secondary text-light">Scryfall</div>
            <div className="card-body p-3">
              Import sets
              <button className="btn btn-primary form-control" onClick={importSetsScry}>
                Import sets
              </button>
              Import cards
              <button className="btn btn-primary form-control" onClick={importCardsScry}>
                Import cards
              </button>
              Force import cards
              <button className="btn btn-danger form-control" onClick={importCardsScryForce}>
                Force import cards
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminView
