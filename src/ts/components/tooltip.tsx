import { h } from 'hyperapp'
import * as tippy from 'tippy.js'

interface TooltipOptions {
  allowTitleHTML: boolean
  animateFill: boolean
  animation: string, // 'shift-away', 'shift-toward', 'fade', 'scale', 'perspective'
  // appendTo: document.body, // Element or Function that returns an element
  arrow: boolean
  arrowTransform: string, // CSS syntax: 'scaleX(0.5)', 'scale(2)', 'translateX(5px)' etc.
  arrowType: string, // 'sharp', 'round'
  createPopperInstanceOnInit: boolean
  delay: number, // Number or Array [show, hide] e.g. [100, 500]
  distance: number,
  duration: number[], // Number or Array [show, hide]
  dynamicTitle: boolean
  flip: boolean
  flipBehavior: string, // 'flip', 'clockwise', 'counterclockwise', Array
  followCursor: boolean
  hideOnClick: boolean | string // 'persistent'
  // html: false, // 'selector', DOM Element
  inertia: boolean
  interactive: boolean
  interactiveBorder: number,
  livePlacement: boolean
  maxWidth: string
  multiple: boolean
  // offset: 0, // '50, 20' = 50px x-axis offset, 20px y-axis offset
  onHidden: (instance) => {},
  onHide: (instance) => {},
  onShow: (instance) => {},
  onShown: (instance) => {},
  performance: boolean
  placement: string, // 'bottom', 'left', 'right', 'top-start', 'top-end', etc.
  popperOptions: any
  size: string, // 'regular', 'small', 'large'
  sticky: boolean
  target: string | null // e.g. '.className'
  theme: string
  touchHold: boolean
  trigger: string, // 'mouseenter focus', 'click', 'manual'
  updateDuration: number
  zIndex: number
}

const tooltipDefaultOptions: TooltipOptions = {
  ...tippy.defaults,
  arrow: true,
  theme: 'mtg',
}

const init = (element) => tippy(element, tooltipDefaultOptions)

const destroy = (element) => element._tippy && element._tippy.destroy()

const update = (element) => {
  if (element._tippy) {
    destroy(element)
    init(element)
  }
}

interface TooltipProps {
  title: string
}

const Tooltip = ({ title }: TooltipProps, children) => (
  <div
    class="d-inline-block"
    title={title}
    oncreate={(element) => init(element)}
    ondestroy={(element) => destroy(element)}
    onupdate={(element) =>  update(element)}
  >
    {children}
  </div>
)

export default Tooltip
