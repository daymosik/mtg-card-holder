import { h } from 'preact'

const colorsMap: { [key: string]: string } = {
  U: 'blue',
  W: 'white',
  B: 'black',
  G: 'green',
  R: 'red',
}

const ManaColorImage = ({ color }: { color: string }) => {
  const isNumber = !isNaN(parseInt(color, 10))
  const shouldDisplayName = isNumber || color === 'X'
  const colorName = colorsMap[color]
  return <span class={`manaColor size-20 ${colorName}`}>{shouldDisplayName ? color : <span>&nbsp;</span>}</span>
}

export default ManaColorImage
