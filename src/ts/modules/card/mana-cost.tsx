import { h } from 'preact'

const colorsMap: { [key: string]: string } = {
  U: 'blue',
  W: 'white',
  B: 'black',
  G: 'green',
  R: 'red',
}

const parseManaCost = (manaCost: string): string[] => {
  const colors = manaCost.split('}')
  colors.pop()
  return colors.map((color) => color.replace('{', ''))
}

const ColorImage = ({ color }: { color: string }) => {
  const isNumber = !isNaN(parseInt(color, 10))
  const shouldDisplayName = isNumber || color === 'X'
  const colorName = colorsMap[color]
  return <span class={`manaColor size-20 ${colorName}`}>{shouldDisplayName ? color : <span>&nbsp;</span>}</span>
}

export const ManaCostView = (manaCost: string): JSX.Element[] => {
  if (!manaCost) {
    return []
  }
  const colors = parseManaCost(manaCost)
  return colors.map((color, i) => <ColorImage key={`${color}${i}`} color={color} />)
}

export default ManaCostView
