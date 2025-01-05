import { FunctionalComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { getCardCollection } from 'store/actions/card-collection-actions'
import { getCardDatabaseSets } from 'store/actions/card-database-actions'
import { RootState } from 'store/reducers/root-reducers'
import LazyLoad from 'utils/lazy-load'

const StartupView: FunctionalComponent = ({ children }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const { isAuthenticationSet, isAuthenticated } = useSelector((state: RootState) => ({
    isAuthenticationSet: state.authState.isAuthenticationSet,
    isAuthenticated: state.authState.isAuthenticated,
  }))

  const initializeData = async (): Promise<void> => {
    if (loading) {
      LazyLoad.startLazyLoad()
    }
    try {
      // TODO: never
      await Promise.all([dispatch(getCardDatabaseSets() as never), dispatch(getCardCollection() as never)])
      setLoading(false)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setLoading(false)
    }
  }

  useEffect(() => {
    void initializeData()
  }, [isAuthenticationSet, isAuthenticated])

  return <div>{loading ? null : children}</div>
}

export default StartupView
