import {RiBuildingLine} from 'react-icons/ri'
import {IoMdLink} from 'react-icons/io'
import {IoLocationOutline} from 'react-icons/io5'
import './index.css'

const Profile = props => {
  const {userData} = props
  return (
    <div className="profile-container">
      <div className="profile-view">
        <img
          src={userData.avatar_url}
          alt={userData.login}
          className="user-logo-img"
        />
        <h1 className="userName">{userData.name}</h1>
        <p className="user-name">{userData.login}</p>
        <p className="user-description">{userData.bio}</p>
        <ul className="user-list">
          <li className="each-value-container">
            <p className="value">{userData.followers}</p>
            <p className="followers">FOLLOWERS</p>
          </li>
          <hr className="line" />
          <li className="each-value-container">
            <p className="value">{userData.following}</p>
            <p className="followers">FOLLOWING</p>
          </li>
          <hr className="line" />
          <li className="each-value-container">
            <p className="value">{userData.public_repos}</p>
            <p className="followers">public repos</p>
          </li>
        </ul>

        <ul className="user-details-list">
          <li className="each-compani-container">
            <p className="compani">Company</p>
            <div className="compani-logo-name-container">
              <RiBuildingLine className="compani-logo" />
              <p className="compani-name">{userData.company}</p>
            </div>
          </li>
          <li className="each-url-container">
            <p className="compani-url-name">Company Url</p>
            <div className="compani-url-container">
              <IoMdLink className="compani-url-logo" />
              <p className="compani-url">{userData.organizations_url}</p>
            </div>
          </li>

          <li className="compani-location-container">
            <p className="location">Location</p>
            <div className="location-container">
              <IoLocationOutline className="compani-location-logo" />
              <p className="compani-location">{userData.location}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Profile
