import { AppState } from '@app'
import { parseRoute } from '@utils/parse-route'
import { h } from 'hyperapp'

export interface LocationState {
  route: string
}

export interface LocationActions {
  setCurrent: (s: AppState) => AppState
}

export const locationActions: LocationActions = {
  setCurrent: (state) => {
    return ({ ...state, location: parseLocation() })
  },
}

export function locationSubscribe(sub: (s: LocationState) => AppState): void {
  function listener() {
    sub(parseLocation())
  }

  listener()
  window.addEventListener('hashchange', listener, false)
}

type LinkProps = { to: string } & JSX.IntrinsicElements

export const Link = (props: LinkProps, children) => {
  const { to, ...otherProps } = props
  return h('a', {
    href: `#/${to}`,
    ...otherProps,
  }, children)
}

export interface RouteProps extends AppState {
  path: string,
  render: JSX.Element
}

export interface MatchProps {
  isExact: boolean
  params: any
  path: string
  url: string
}

export const Route = (props: RouteProps) => {
  // TODO
  const match = parseRoute(props.path, props.location.route, {
    // exact: !props.parent,
  })
  return (
    props.location.route === props.path || (match && match.path) ? props.render({ ...props, ...match }) : undefined
  )
}

function routeMatches(s: LocationState, path: string) {
  const c = s.route
}

export function parseLocation(): LocationState {
  const locationHash = window.location.hash
  const hash = locationHash.split('#').slice(1).join('#')
  const route = hash.split('/').filter((x) => x).join('/')
  return { route }
}
