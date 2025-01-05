import LoadingSpinner from 'components/loading-spinner'
import { useSelector } from 'react-redux'
import { FunctionalComponent, h } from 'preact'
import { RootState } from 'store/reducers/root-reducers'
import SetListView from 'modules/card-database/card-database/set-list'

export const CardDatabaseView: FunctionalComponent = () => {
  const { sets } = useSelector((state: RootState) => ({
    sets: state.cardDatabaseState.sets,
  }))
  return (
    <div className="container">
      <figure>
        <blockquote className="blockquote">
          <p>Card Database</p>
        </blockquote>
        <figcaption className="blockquote-footer">View all cards in the database</figcaption>
      </figure>

      <hr />

      {!sets.length ? <LoadingSpinner /> : <SetListView sets={sets} />}
    </div>
  )
}

export default CardDatabaseView
