import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="nav-container">
      <NavLink to="/" exact className="nav-logo">
        <h1 className="header-heading">Github Profile Visualizer</h1>
      </NavLink>

      {/* Desktop menu */}
      <ul className="header-list">
        <li>
          <NavLink to="/" exact activeClassName="active" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/repositories"
            activeClassName="active"
            className="nav-link"
          >
            Repositories
          </NavLink>
        </li>
        <li>
          <NavLink to="/analysis" activeClassName="active" className="nav-link">
            Analysis
          </NavLink>
        </li>
      </ul>

      {/* Hamburger (only visible on small screens) */}
      <button
        type="button"
        className="hamburger-btn"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <GiHamburgerMenu size={24} />
      </button>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <ul className="mobile-menu">
          <li>
            <NavLink
              to="/"
              exact
              activeClassName="active"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/repositories"
              activeClassName="active"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Repositories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analysis"
              activeClassName="active"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Analysis
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Header
