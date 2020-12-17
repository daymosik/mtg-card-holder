import LoadingSpinner from 'components/loading-spinner'
import { MagicSet, MagicSetType } from 'models/magic'
import { useSelector } from 'react-redux'
import { FunctionalComponent, h } from 'preact'
import { Link } from 'preact-router'
import { setTypes } from 'store/reducers/card-database-reducers'
import { RootState } from 'store/reducers/root-reducers'

interface SetListTableProps {
  sets: MagicSet[]
}

const SetListTable: FunctionalComponent<SetListTableProps> = ({ sets }) => (
  <table class="table table-dark bg-transparent table-sm">
    <thead>
      <tr>
        <th scope="col" />
        <th scope="col">Name</th>
        <th scope="col" class="text-right">
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
    <td class="h4 text-center">
      <i class={`ss ss-${set.code.toLowerCase()}`} />
    </td>
    <td class="align-content-center">
      <Link href={`/set/${set.code}`}>{set.name}</Link>
    </td>
    <td class="text-nowrap text-right">{set.releaseDate}</td>
  </tr>
)

interface SetListProps {
  type: string
  sets: MagicSet[]
}

const SetList = ({ type, sets }: SetListProps) => (
  <div class="col-md-6 col-lg-4">
    <h4>{type}</h4>
    <SetListTable sets={sets} />
  </div>
)

interface SetListViewProps {
  sets: MagicSet[]
}

const SetListView: FunctionalComponent<SetListViewProps> = ({ sets }) => {
  const mainSetsList = [MagicSetType.Core, MagicSetType.DuelDeck, MagicSetType.Expansion]
  const restSetsList = setTypes.filter((t) => mainSetsList.indexOf(t) < 0)

  const getSetsByType = (type: MagicSetType): MagicSet[] =>
    sets.filter((set) => set.type === type).sort((a, b) => (a.releaseDate > b.releaseDate ? -1 : 1))

  return (
    <div class="row d-flex flex-row">
      {mainSetsList.map((type: MagicSetType) => (
        <SetList key={type} type={type} sets={getSetsByType(type)} />
      ))}
      {restSetsList.map((type: MagicSetType) => (
        <SetList key={type} type={type} sets={getSetsByType(type)} />
      ))}
    </div>
  )
}

export const CardDatabaseView: FunctionalComponent = () => {
  const { sets } = useSelector((state: RootState) => ({
    sets: state.cardDatabaseState.sets,
  }))
  return (
    <div class="container">
      <h3>Card Database</h3>
      <div>
        {!sets.length && <LoadingSpinner />}
        {sets.length > 0 && <SetListView sets={sets} />}
      </div>
    </div>
  )
}

export default CardDatabaseView
