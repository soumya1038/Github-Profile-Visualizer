import {RiBuildingLine} from 'react-icons/ri'
import {IoMdLink} from 'react-icons/io'
import {IoLocationOutline} from 'react-icons/io5'
import './index.css'

const Profile = () => (
  <div className="profile-container">
    <div className="profile-view">
      <img
        src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755525072/856e15e91f7897203412749b3f9c1e30425aea55_ibc4zi.png"
        alt="{username}"
        className="user-logo-img"
      />
      <h1 className="userName">NAME</h1>
      <p className="user-name">User name</p>
      <p className="user-description">
        The Webflow Designer brings the power of HTML and CSS into visual
        website design software, allowing creators from agencies to business to
        build custom sites{' '}
      </p>
      <ul className="user-list">
        <li className="each-value-container">
          <p className="value">1,535,402</p>
          <p className="followers">FOLLOWERS</p>
        </li>
        <hr className="line" />
        <li className="each-value-container">
          <p className="value">250</p>
          <p className="followers">FOLLOWING</p>
        </li>
        <hr className="line" />
        <li className="each-value-container">
          <p className="value">35</p>
          <p className="followers">public repos</p>
        </li>
      </ul>

      <ul className="user-details-list">
        <li className="each-compani-container">
          <p className="compani">Company</p>
          <div className="compani-logo-name-container">
            <RiBuildingLine className="compani-logo" />
            <p className="compani-name">Github</p>
          </div>
        </li>
        <li className="each-url-container">
          <p className="compani-url-name">Company Url</p>
          <div className="compani-url-container">
            <IoMdLink className="compani-url-logo" />
            <p className="compani-url">https://githubsourcework.xyz</p>
          </div>
        </li>

        <li className="compani-location-container">
          <p className="location">Location</p>
          <div className="location-container">
            <IoLocationOutline className="compani-location-logo" />
            <p className="compani-location">Portland,USA</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
)
// <img
//   src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755532203/Line_s51hrf.png"
//   alt="compani-logo"
//   className="compani-logo"
// />
// <img
//   src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755533396/link_yearta.png"
//   alt="compani-url"
//   className="compani-url-logo"
// />
// <img
//   src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755534833/location_on_zxlowf.png"
//   alt="compani-location"
//   className="compani-location-logo"
// />

export default Profile
