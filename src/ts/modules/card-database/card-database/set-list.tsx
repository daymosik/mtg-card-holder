import { ScrySet, ScrySetType } from 'models/magic'
import { FunctionalComponent, h } from 'preact'
import { useState } from 'preact/hooks'
import { Link } from 'preact-router'

interface SetListTableProps {
  sets: ScrySet[]
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
  set: ScrySet
}

const SetListItem: FunctionalComponent<SetListItemProps> = ({ set }) => (
  <tr>
    <td className="h4 text-center">
      <i className={`ss ss-${set.code.toLowerCase()}`} />
    </td>
    <td className="align-content-center">
      <Link href={`/set/${set.code}`}>{set.name}</Link>
    </td>
    <td className="text-nowrap text-right">{set.released_at}</td>
  </tr>
)

interface SetListProps {
  type: string
  sets: ScrySet[]
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
  sets: ScrySet[]
}

const SetListView: FunctionalComponent<SetListViewProps> = ({ sets }) => {
  const setTypes = sets.reduce(
    (prev, set) => (prev.includes(set.set_type) ? prev : [...prev, set.set_type]),
    [] as ScrySetType[],
  )

  const mainSetsList: ScrySetType[] = ['core', 'duel_deck', 'expansion']
  const restSetsList = setTypes.filter((t) => mainSetsList.indexOf(t) < 0)

  const getSetsByType = (type: ScrySetType): ScrySet[] =>
    sets.filter((set) => set.set_type === type).sort((a, b) => ((a.released_at || '') > (b.released_at || '') ? -1 : 1))

  return (
    <div className="d-md-flex gap-3">
      <div className="accordion flex-grow-1" id="accordionExample">
        {mainSetsList.map((type) => (
          <SetList key={type} type={type} sets={getSetsByType(type)} />
        ))}
      </div>
      <div className="accordion" id="accordionExample">
        {restSetsList.map((type) => (
          <SetList key={type} type={type} sets={getSetsByType(type)} />
        ))}
      </div>
    </div>
  )
}
export default SetListView
