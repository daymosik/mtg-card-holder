import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import { MagicSet, MagicSetType } from '../../../types/magic'
import { AppActions, AppState } from '../../app'
import LoadingSpinner from '../../components/loading-spinner'
import CardDatabaseService from '../../services/card-database'

const setTypes: MagicSetType[] = [
  MagicSetType.Core,
  MagicSetType.Un,
  MagicSetType.Promo,
  MagicSetType.Starter,
  MagicSetType.Planechase,
  MagicSetType.Masters,
  MagicSetType.Reprint,
  MagicSetType.BoardGameDeck,
  MagicSetType.FromTheVault,
  MagicSetType.DuelDeck,
  MagicSetType.Commander,
  MagicSetType.Expansion,
  MagicSetType.Box,
  MagicSetType.PremiumDeck,
  MagicSetType.Masterpiece,
  MagicSetType.Conspiracy,
  MagicSetType.Vanguard,
  MagicSetType.TwoHeadedGiant,
  MagicSetType.Archenemy,
]

export interface CardDatabaseState {
  sets: MagicSet[]
}

export const initialCardDatabaseState = {
  sets: [],
}

export interface CardDatabaseActions {
  getSets: typeof cardDatabaseActions.getSets
  getSetsCommit: typeof cardDatabaseActions.getSetsCommit
}

export const cardDatabaseActions = {
  getSets: () => async (state: CardDatabaseState, actions: CardDatabaseActions) => {
    const sets: MagicSet[] = await CardDatabaseService.getSets()
    actions.getSetsCommit(sets)
    return sets
  },
  getSetsCommit: (sets: MagicSet[]) => (state: CardDatabaseState): CardDatabaseState => ({ ...state, sets }),
}

interface SetListTableProps {
  sets: MagicSet[]
}

const SetListTable = ({ sets }: SetListTableProps) => (
  <table class="table table-dark bg-transparent table-sm">
    <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Name</th>
      <th scope="col" class="text-right">Release date</th>
    </tr>
    </thead>
    <tbody>
    {sets.length > 0 && sets.map((set) => <SetListItem set={set}/>)}
    </tbody>
  </table>
)

interface SetListItemProps {
  set: MagicSet
}

const SetListItem = ({ set }: SetListItemProps) => (
  <tr>
    <td class="h4 text-center"><i class={`ss ss-${set.code.toLowerCase()}`}/></td>
    <td class="align-content-center"><Link to={`/set/${set.code}`}>{set.name}</Link></td>
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
    <SetListTable sets={sets}/>
  </div>
)

interface SetListViewProps {
  sets: MagicSet[],
}

const SetListView = ({ sets }: SetListViewProps) => {
  const mainSetsList = [MagicSetType.Core, MagicSetType.DuelDeck, MagicSetType.Expansion]
  const restSetsList = setTypes.filter((t) => mainSetsList.indexOf(t) < 0)

  const getSetsByType = (type: MagicSetType): MagicSet[] => sets
    .filter((set) => set.type === type)
    .sort((a, b) => a.releaseDate > b.releaseDate ? -1 : 1)

  return (
    <div class="row d-flex flex-row">
      {mainSetsList.map((type: MagicSetType) => <SetList type={type} sets={getSetsByType(type)}/>)}
      {restSetsList.map((type: MagicSetType) => <SetList type={type} sets={getSetsByType(type)}/>)}
    </div>
  )
}

export const CardDatabaseView = (state: AppState, actions: AppActions) => () => (
  <div class="container">
    <h3>Card Database</h3>
    <div oncreate={() => actions.cardDatabase.getSets()}>
      {!state.cardDatabase.sets.length && <LoadingSpinner/>}
      {state.cardDatabase.sets.length > 0 && <SetListView sets={state.cardDatabase.sets}/>}
    </div>
  </div>
)

export default CardDatabaseView
