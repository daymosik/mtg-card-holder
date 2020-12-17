import { FunctionalComponent, h } from 'preact'

export enum CardsDisplayType {
  List = 'list',
  Images = 'images',
}

interface CardsListSwitcherProps {
  className?: string
  setDisplayType: (displayType: CardsDisplayType) => void
}

const CardsListSwitcher: FunctionalComponent<CardsListSwitcherProps> = ({ setDisplayType, className }) => (
  <div class={className}>
    <a class="m-2 p-2 bg-dark h3 rounded d-inline-block" onClick={() => setDisplayType(CardsDisplayType.List)}>
      <i class="fas fa-bars" />
    </a>
    <a class="m-2 p-2 bg-dark h3 rounded d-inline-block" onClick={() => setDisplayType(CardsDisplayType.Images)}>
      <i class="fas fa-grip-horizontal" />
    </a>
  </div>
)

export default CardsListSwitcher
