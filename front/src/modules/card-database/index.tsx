import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import { MagicSet } from '../../../../server/src/modules/CardDatabase'
import { AppActions, AppState } from '../../app'
import CardDatabaseService from '../../services/card-database'

export interface CardDatabaseState {
  sets: MagicSet[]
}

export const initialCardDatabaseState = {
  sets: [],
}

export interface CardDatabaseActions {
  getSets: () => (state: CardDatabaseState) => Promise<CardDatabaseState>,
  getSetsCommit: (cards: MagicSet[]) => (state: CardDatabaseState) => CardDatabaseState
}

export const cardDatabaseActions = {
  getSets: () => async (state: CardDatabaseState, actions: CardDatabaseActions) => {
    try {
      const sets: MagicSet[] = await CardDatabaseService.getSets()
      actions.getSetsCommit(sets)
      return sets
    } catch (e) {
      console.log(e)
    }
  },
  getSetsCommit: (sets: MagicSet[]) => (state: CardDatabaseState) => ({ ...state, sets }),
}

interface SetListTableProps {
  sets: MagicSet[]
  match: any
}

const SetListTable = ({ sets, match }: SetListTableProps) => (
  <table class="table table-light">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Release date</th>
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
    <th scope="row">1</th>
    <td><Link to={`/set/${set.code}`}>{set.name}</Link></td>
    <td>{set.releaseDate}</td>
  </tr>
)

export const CardDatabaseView = (state: AppState, actions: AppActions) => () => (
  <div>
    <h1>Card Database</h1>
    <div oncreate={() => actions.cardDatabase.getSets()}>
      <SetListTable match sets={state.cardDatabase.sets}/>
    </div>
  </div>
)

export default CardDatabaseView
