import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755624833/Group_7519_n18k4a.png"
      alt="not found"
      className="notfound-image"
    />
    <p className="notfound-heading">PAGE NOT FOUND</p>
    <p className="notfound-description">
      we’re sorry, the page you requested could not be found Please go back to
      the homepage
    </p>
    <button type="button" className="go-to-home-button">
      Go to Home
    </button>
  </div>
)

export default NotFound
