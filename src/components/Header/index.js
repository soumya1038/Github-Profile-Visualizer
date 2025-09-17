import {useState} from 'react'
import {Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="nav-container">
      <Link to="/" exact className="nav-logo">
        <h1 className="header-heading">Github Profile Visualizer</h1>
      </Link>

      {/* Desktop menu */}
      <ul className="header-list">
        <li>
          <Link to="/" exact activeClassName="active" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/repositories"
            activeClassName="active"
            className="nav-link"
          >
            Repositories
          </Link>
        </li>
        <li>
          <Link to="/analysis" activeClassName="active" className="nav-link">
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
              exact
              activeClassName="active"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/repositories"
              activeClassName="active"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Repositories
            </Link>
          </li>
          <li>
            <Link
              to="/analysis"
              activeClassName="active"
              className="nav-link"
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
