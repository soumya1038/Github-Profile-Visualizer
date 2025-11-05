import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755624833/Group_7519_n18k4a.png"
      alt="page not found"
      className="notfound-image"
    />
    <h1 className="notfound-heading">PAGE NOT FOUND</h1>
    <p className="notfound-description">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="go-to-home-button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound

// export {default as NotFound} from './NotFound'
