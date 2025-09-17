// import Header from '../Header'
import {Link} from 'react-router-dom'
import './index.css'

const NoDataFound = props => {
  const {repoName, alt} = props
  return (
    <>
      <div className="nodatafound-container">
        <img
          src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755626238/Empty_Box_Illustration_1_nhhdgk.png"
          alt={alt}
          className="nodatafound-image"
        />
        <h1 className="nodatafound-heading">No Data Found</h1>
        <p className="nodatafound-description">
          GitHub Username is empty, please provide a valid username for{' '}
          {repoName}
        </p>
        <Link to="/">
          <button type="button" className="nodatafound-button">
            Go to Home
          </button>
        </Link>
      </div>
    </>
  )
}
export default NoDataFound
