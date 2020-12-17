import { FunctionalComponent, h } from 'preact'

export const LoadingSpinner: FunctionalComponent = () => (
  <div class="spinner">
    <div class="double-bounce1" />
    <div class="double-bounce2" />
  </div>
)

export default LoadingSpinner
