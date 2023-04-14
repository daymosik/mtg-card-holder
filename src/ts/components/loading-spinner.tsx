import { FunctionalComponent, h } from 'preact'

export const LoadingSpinner: FunctionalComponent = () => (
  <div className="spinner">
    <div className="double-bounce1" />
    <div className="double-bounce2" />
  </div>
)

export default LoadingSpinner
