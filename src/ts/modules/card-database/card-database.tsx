import LoadingSpinner from 'components/loading-spinner'
import { MagicSet, MagicSetType } from 'models/magic'
import { useSelector } from 'react-redux'
import { FunctionalComponent, h } from 'preact'
import { Link } from 'preact-router'
import { setTypes } from 'store/reducers/card-database-reducers'
import { RootState } from 'store/reducers/root-reducers'
import { useState } from 'preact/hooks'

interface SetListTableProps {
  sets: MagicSet[]
}

const SetListTable: FunctionalComponent<SetListTableProps> = ({ sets }) => (
  <table className="table table-dark bg-transparent table-sm">
    <thead>
      <tr>
        <th scope="col" />
        <th scope="col">Name</th>
        <th scope="col" className="text-right">
          Release date
        </th>
      </tr>
    </thead>
    <tbody>{sets.length > 0 && sets.map((set) => <SetListItem key={set} set={set} />)}</tbody>
  </table>
)

interface SetListItemProps {
  set: MagicSet
}

const SetListItem: FunctionalComponent<SetListItemProps> = ({ set }) => (
  <tr>
    <td className="h4 text-center">
      <i className={`ss ss-${set.code.toLowerCase()}`} />
    </td>
    <td className="align-content-center">
      <Link href={`/set/${set.code}`}>{set.name}</Link>
    </td>
    <td className="text-nowrap text-right">{set.releaseDate}</td>
  </tr>
)

interface SetListProps {
  type: string
  sets: MagicSet[]
}

const SetList = ({ type, sets }: SetListProps) => {
  const [isOpen, setIsOpen] = useState(type === 'core')
  const toggleIsOpen = () => setIsOpen(!isOpen)
  return (
    <div className="accordion-item">
      <h4 className="accordion-header" id="headingOne">
        <button
          className={`accordion-button ${isOpen ? 'collapsed' : ''}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
          onClick={toggleIsOpen}
        >
          {type}
        </button>
      </h4>
      <div
        id="collapseOne"
        className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <SetListTable sets={sets} />
        </div>
      </div>
    </div>
  )
}

interface SetListViewProps {
  sets: MagicSet[]
}

const SetListView: FunctionalComponent<SetListViewProps> = ({ sets }) => {
  const mainSetsList = [MagicSetType.Core, MagicSetType.DuelDeck, MagicSetType.Expansion]
  const restSetsList = setTypes.filter((t) => mainSetsList.indexOf(t) < 0)

  const getSetsByType = (type: MagicSetType): MagicSet[] =>
    sets.filter((set) => set.type === type).sort((a, b) => (a.releaseDate > b.releaseDate ? -1 : 1))

  return (
    <div className="d-md-flex gap-3">
      <div className="accordion flex-grow-1" id="accordionExample">
        {mainSetsList.map((type: MagicSetType) => (
          <SetList key={type} type={type} sets={getSetsByType(type)} />
        ))}
      </div>
      <div className="accordion" id="accordionExample">
        {restSetsList.map((type: MagicSetType) => (
          <SetList key={type} type={type} sets={getSetsByType(type)} />
        ))}
      </div>
    </div>
  )
}

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
