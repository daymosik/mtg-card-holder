import { h } from 'hyperapp'

export enum CardsDisplayType {
  List = 'list',
  Images = 'images',
}

interface CardsListSwitcherProps {
  className?: string
  setDisplayType: (displayType: CardsDisplayType) => (state: any) => any,
}

const CardsListSwitcher = ({ setDisplayType, className }: CardsListSwitcherProps) => (
  <div class={className}>
    <a class="m-2 p-2 bg-dark h3 rounded d-inline-block" onclick={() => setDisplayType(CardsDisplayType.List)}>
      <i class="fas fa-bars"/>
    </a>
    <a class="m-2 p-2 bg-dark h3 rounded d-inline-block" onclick={() => setDisplayType(CardsDisplayType.Images)}>
      <i class="fas fa-grip-horizontal"/>
    </a>
  </div>
)

export default CardsListSwitcher
