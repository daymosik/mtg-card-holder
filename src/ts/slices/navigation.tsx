import { NavigationPath } from 'models/routes'
import { useState } from 'preact/hooks'
import { useSelector } from 'react-redux'
import LoginService from 'services/login'
import { FunctionalComponent, h } from 'preact'
import { Link } from 'preact-router'
import { RootState } from 'store/reducers/root-reducers'

interface NavigationButtonProps {
  onClick: () => void
}

const NavigationButton: FunctionalComponent<NavigationButtonProps> = ({ onClick }) => (
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
    onClick={onClick}
  >
    <span className="navbar-toggler-icon" />
  </button>
)

interface NavigationListItemProps {
  name: string
  path?: string
  onClick?: () => void
}

const NavigationListItem: FunctionalComponent<NavigationListItemProps> = ({ path, name, onClick }) => (
  <li className="nav-item">
    {path && (
      <Link className="nav-link" href={path}>
        {name}
      </Link>
    )}
    {onClick && (
      <a className="nav-link" onClick={() => onClick()}>
        {name}
      </a>
    )}
  </li>
)

interface NavigationMenuProps {
  mobileMenuOpen: boolean
  hideMobileMenu: () => void
  isAuthenticated: boolean
}

const NavigationMenu: FunctionalComponent<NavigationMenuProps> = ({
  mobileMenuOpen,
  hideMobileMenu,
  isAuthenticated,
}) => (
  <div
    className={`collapse navbar-collapse pull-right ${mobileMenuOpen ? 'show' : ''}`}
    id="navbarSupportedContent"
    onClick={() => hideMobileMenu()}
  >
    <ul className="navbar-nav me-auto">
      <NavigationListItem path={NavigationPath.CardDatabase} name={'Card Database'} />
      <NavigationListItem path={NavigationPath.CardCollection} name={'My Collection'} />
      <NavigationListItem path={NavigationPath.CardRecognition} name={'Card recognition'} />
      <NavigationListItem path={NavigationPath.Admin} name={'Admin'} />
    </ul>
    <ul className="navbar-nav">
      {!isAuthenticated && <NavigationListItem path={NavigationPath.Signup} name={'Signup'} />}
      {!isAuthenticated && <NavigationListItem path={NavigationPath.Login} name={'Login'} />}
      {isAuthenticated && <NavigationListItem onClick={() => LoginService.logout()} name={'Logout'} />}
    </ul>
  </div>
)

export const NavigationView: FunctionalComponent = () => {
  const [mobileMenuOpen, changeMobileMenuOpen] = useState(false)

  const { isAuthenticated } = useSelector((state: RootState) => ({
    isAuthenticated: state.authState.isAuthenticated,
  }))

  const toggleMobileMenu = () => changeMobileMenuOpen(!mobileMenuOpen)

  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="container">
        <NavigationButton onClick={toggleMobileMenu} />

        <Link className="navbar-brand" href="/" alt="MTG Card Holder" />

        <NavigationMenu
          mobileMenuOpen={mobileMenuOpen}
          hideMobileMenu={toggleMobileMenu}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </nav>
  )
}

export default NavigationView
