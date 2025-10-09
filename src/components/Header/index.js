import {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation() // gives current route path

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // helper to check if a link is active
  const isActive = path => (location.pathname === path ? 'active' : '')

  return (
    <nav className="nav-container">
      <Link to="/" className="nav-logo">
        <h1 className="header-heading">Github Profile Visualizer</h1>
      </Link>

      {/* Desktop menu */}
      <ul className="header-list">
        <li>
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/repositories"
            className={`nav-link ${isActive('/repositories')}`}
          >
            Repositories
          </Link>
        </li>
        <li>
          <Link to="/analysis" className={`nav-link ${isActive('/analysis')}`}>
            Analysis
          </Link>
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
            <Link
              to="/"
              className={`nav-link ${isActive('/')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/repositories"
              className={`nav-link ${isActive('/repositories')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Repositories
            </Link>
          </li>
          <li>
            <Link
              to="/analysis"
              className={`nav-link ${isActive('/analysis')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Analysis
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Header
