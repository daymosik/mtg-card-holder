import { FunctionalComponent, h } from 'preact'
import { MutableRef, useEffect, useRef } from 'preact/hooks'
import tippy, { RenderProps, ReferenceElement } from 'tippy.js'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const tooltipDefaultOptions: RenderProps = {
  ...tippy.defaultProps,
  arrow: true,
  theme: 'mtg',
}

const init = (element: ReferenceElement, content: string) => tippy(element, { ...tooltipDefaultOptions, content })

const destroy = (element: ReferenceElement) => element._tippy && element._tippy.destroy()

const update = (element: ReferenceElement, content: string) => {
  if (element._tippy) {
    destroy(element)
    init(element, content)
  } else {
    init(element, content)
  }
}

interface TooltipProps {
  title: string
}

const Tooltip: FunctionalComponent<TooltipProps> = ({ title, children }) => {
  const element = useRef<HTMLDivElement>() as MutableRef<HTMLDivElement>

  useEffect(() => {
    update(element.current, title)

    // TODO
    // return () => {
    //   destroy(element.current)
    // }
  }, [title])

  return (
    <div className="d-inline-block" title={title} ref={element}>
      {children}
    </div>
  )
}

export default Tooltip
