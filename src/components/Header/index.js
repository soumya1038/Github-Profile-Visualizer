import {NavLink} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="nav-container">
    <NavLink to="/" end className="nav-logo">
      <h1 className="header-heading">Github Profile Visualizer</h1>
    </NavLink>
    <ul className="header-list">
      <li>
        <NavLink
          to="/"
          end
          className={({isActive}) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/repository"
          className={({isActive}) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Repositories
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/analysis"
          className={({isActive}) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Analysis
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default Header
