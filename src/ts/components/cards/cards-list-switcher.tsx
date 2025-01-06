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
  <div className={className}>
    <a className="m-2 p-2 bg-dark h3 rounded-3 d-inline-block" onClick={() => setDisplayType(CardsDisplayType.List)}>
      <i className="fas fa-bars" />
    </a>
    <a className="m-2 p-2 bg-dark h3 rounded-3 d-inline-block" onClick={() => setDisplayType(CardsDisplayType.Images)}>
      <i className="fas fa-grip-horizontal" />
    </a>
  </div>
)

export default CardsListSwitcher
