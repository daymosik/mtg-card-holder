import { h } from 'hyperapp'

const colorsMap = {
  U: 'blue',
  W: 'white',
  B: 'black',
  G: 'green',
  R: 'red',
}

const parseManaCost = (manaCost): string[] => {
  const colors = manaCost.split('}')
  colors.pop()
  return colors.map((color) => color.replace('{', ''))
}

const ColorImage = ({color}) => {
  const isNumber = !isNaN(parseInt(color, 10))
  return (
    <span class={`manaColor size-20 ${colorsMap[color]}`}>
      {isNumber ? color : <span>&nbsp;</span>}
    </span>
  )
}

export const ManaCostView = (manaCost: string) => {
  if (!manaCost) {
    return
  }
  const colors = parseManaCost(manaCost)
  return (
    <div>
      <div>
        {colors.map((color) => <ColorImage color={color} />)}
      </div>
    </div>
  )
}

export default ManaCostView
