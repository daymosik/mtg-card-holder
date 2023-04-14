import { ComponentType, FunctionalComponent, h } from 'preact'
import { RootState } from 'store/reducers/root-reducers'
import { useSelector } from 'react-redux'
import { Route, RouterProps } from 'preact-router'

interface ComponentProps {
  component: ComponentType<RouterProps> | ComponentType<unknown>
  path: string
}

type Props = ComponentProps & RouterProps

const Unauthorized: FunctionalComponent = () => (
  <div className="container">
    <h2 className="text-center">Unauthorized</h2>
  </div>
)

const PrivateRoute: FunctionalComponent<Props> = (props) => {
  const { isAuthenticated } = useSelector((state: RootState) => ({
    isAuthenticated: state.authState.isAuthenticated,
  }))

  const { component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      component={
        // tslint:disable-next-line jsx-no-lambda
        (props) => (isAuthenticated ? <Component {...props} /> : <Unauthorized />)
      }
    />
  )
}

export default PrivateRoute
