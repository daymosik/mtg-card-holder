import { h } from 'hyperapp'
import { Link } from 'hyperapp-hash-router'
import { MagicSet, MagicSetType } from '../../../types/magic'
import { AppActions, AppState } from '../../app'
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
    try {
      const sets: MagicSet[] = await CardDatabaseService.getSets()
      actions.getSetsCommit(sets)
      return sets
    } catch (e) {
      console.log(e)
    }
  },
  getSetsCommit: (sets: MagicSet[]) => (state: CardDatabaseState): CardDatabaseState => ({ ...state, sets }),
}

interface SetListTableProps {
  sets: MagicSet[]
}

const SetListTable = ({ sets }: SetListTableProps) => (
  <table class="table table-light table-sm">
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
    <td class="text-nowrap">{set.releaseDate}</td>
  </tr>
)

export const CardDatabaseView = (state: AppState, actions: AppActions) => () => {
  const main = [MagicSetType.Core, MagicSetType.DuelDeck, MagicSetType.Expansion]
  const rest = setTypes.filter((t) => main.indexOf(t) < 0)

  const getSetsByType = (type: MagicSetType): MagicSet[] => state.cardDatabase.sets
    .filter((set) => set.type === type)
    .sort((a, b) => a.releaseDate > b.releaseDate ? -1 : 1)

  return (
    <div class="container-fluid">
      <h1>Card Database</h1>
      <div oncreate={() => actions.cardDatabase.getSets()}>

        <div class="row d-flex flex-row">
          {main.map((type: MagicSetType) => (
            <div class="col-md-6 col-lg-4">
              <h4>{type}</h4>
              <SetListTable sets={getSetsByType(type)}/>
            </div>
          ))}

          {rest.map((type: MagicSetType) => (
            <div class="col-md-6 col-lg-4">
              <h4>{type}</h4>
              <SetListTable sets={getSetsByType(type)}/>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default CardDatabaseView
