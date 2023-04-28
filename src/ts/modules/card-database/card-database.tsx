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
      <h3>Card Database</h3>
      {!sets.length ? <LoadingSpinner /> : <SetListView sets={sets} />}
    </div>
  )
}

export default CardDatabaseView
