import ManaColorImage from 'components/card/mana-color-image'
import { h } from 'preact'

const parseManaCost = (manaCost: string): string[] => {
  const colors = manaCost.split('}')
  colors.pop()
  return colors.map((color) => color.replace('{', ''))
}

export const ManaCostView = (manaCost: string | null | undefined): JSX.Element[] => {
  if (!manaCost) {
    return []
  }
  const colors = parseManaCost(manaCost)
  return colors.map((color, i) => <ManaColorImage key={`${color}${i}`} color={color} />)
}

export default ManaCostView
