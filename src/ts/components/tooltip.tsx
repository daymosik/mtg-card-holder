import { FunctionalComponent, h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import tippy, { Options, ReferenceElement } from 'tippy.js'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const tooltipDefaultOptions: Options = {
  ...tippy.defaults,
  arrow: true,
  theme: 'mtg',
}

const init = (element: ReferenceElement) => tippy(element, tooltipDefaultOptions)

const destroy = (element: ReferenceElement) => element._tippy && element._tippy.destroy()

const update = (element: ReferenceElement) => {
  if (element._tippy) {
    destroy(element)
    init(element)
  } else {
    init(element)
  }
}

interface TooltipProps {
  title: string
}

const Tooltip: FunctionalComponent<TooltipProps> = ({ title, children }) => {
  const element = useRef<HTMLDivElement>()

  useEffect(() => {
    update(element.current)

    // TODO
    // return () => {
    //   destroy(element.current)
    // }
  }, [])

  return (
    <div class="d-inline-block" title={title} ref={element}>
      {children}
    </div>
  )
}

export default Tooltip
