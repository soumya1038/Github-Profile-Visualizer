import {RiBuildingLine} from 'react-icons/ri'
import {IoMdLink} from 'react-icons/io'
import {IoLocationOutline} from 'react-icons/io5'
import './index.css'

const Profile = props => {
  const {userData} = props
  const {
    avatarUrl,
    name,
    login,
    bio,
    blog,
    followers,
    following,
    publicRepos,
    company,
    location,
    organizationsUrl,
  } = userData

  return (
    <div data-testid="repoItem" className="repo-item">
      <div className="profileDetailsContainer">
        <img src={avatarUrl} alt={name} className="avatar-url" />
        <p className="login">{login}</p>
        <h1 className="name">{name}</h1>
        <p className="bio">BIO</p>
        <p className="bio">{bio}</p>
        <p className="bio">Blog</p>
        <p className="bio">{blog}</p>
        <div className="followers-following-public-container">
          <div className="followers-container">
            <p className="followers">{followers}</p>
            <p className="followers-heading">FOLLOWERS</p>
          </div>
          <hr className="hor-line" />
          <div className="following-container">
            <p className="followers">{following}</p>
            <p className="followers-heading">FOLLOWING</p>
          </div>
          <hr className="hor-line" />
          <div className="pubic-repos-container">
            <p className="followers">{publicRepos}</p>
            <p className="followers-heading">PUBLIC REPOS</p>
          </div>
        </div>
        <div className="bottom-container">
          <div className="company-container">
            <div className="companyUrl">
              <RiBuildingLine className="icon-style" />
              <p>Company</p>
              <p>{company}</p>
            </div>
          </div>
          <div className="company-container">
            <p className="company-heading">Location</p>
            <div className="companyUrl">
              <IoLocationOutline className="icon-style" />
              <p>{location}</p>
            </div>
          </div>
          <div className="company-container">
            <h1 className="url-heading">Organization Url</h1>
            <div className="companyUrl">
              <IoMdLink className="icon-style" />
              <a href={organizationsUrl}>{organizationsUrl}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
