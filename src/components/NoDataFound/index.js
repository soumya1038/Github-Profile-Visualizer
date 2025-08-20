import Header from '../Header'
import './index.css'

const NoDataFound = () => (
  <div className="nodatafound-container">
    <Header />
    <img
      src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755626238/Empty_Box_Illustration_1_nhhdgk.png"
      alt="no data found"
      className="nodatafound-image"
    />
    <p className="nodatafound-heading">No Data Found</p>
    <p className="nodatafound-description">
      GitHub Username is empty, please provide a valid username for Repositories
    </p>
    <button type="button" className="nodatafound-button">
      Go to Home
    </button>
  </div>
)

export default NoDataFound
