import {HiOutlineSearch} from 'react-icons/hi'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import UsernameContext from '../../UsernameContext'
import Header from '../Header'
import Profile from '../Profile'
import NoInternet from '../NoInternet'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    errorMsg: '',
    userData: [],
    isActiveError: false,
    inputUsername: '',
  }

  componentDidMount() {
    const {username} = this.context
    if (username?.trim() !== '') {
      this.getUserProfile(username)
    }
  }

  // Fetch profile for the given username
  getUserProfile = async username => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      isActiveError: false,
    })

    const apiUrl = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=${process.env.REACT_APP_GIT_TOKEN}`

    const options = {
      method: 'GET',
      headers: {}, // ✅ lowercase
    }

    try {
      const response = await fetch(apiUrl, options)

      const data = await response.json()
      if (response.ok) {
        const updatedData = {
          avatarUrl: data.avatar_url,
          bio: data.bio,
          blog: data.blog,
          company: data.company,
          followers: data.followers,
          following: data.following,
          location: data.location,
          login: data.login,
          name: data.name,
          organizationsUrl: data.organizations_url,
          publicRepos: data.public_repos,
        }
        this.setState({
          userData: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          errorMsg: data.error_msg,
          apiStatus: apiStatusConstants.failure,
          isActiveError: true,
        })
      }
    } catch (error) {
      this.setState({
        errorMsg: 'Something went wrong',
        apiStatus: apiStatusConstants.failure,
        isActiveError: true,
      })
    }
  }

  renderProfile = () => {
    const {userData} = this.state
    return <Profile userData={userData} />
  }

  onclickRetry = () => {
    const {username} = this.context
    this.getUserProfile(username)
  }

  renderFailureView = () => <NoInternet onclickRetry={this.onclickRetry} />

  renderHome = () => (
    <div className="home-img-container">
      <h1 className="home-Heading">Github Profile Visualizer</h1>
      <img
        src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755488846/Group_2_rfvoc5.png"
        alt="github profile visualizer home page"
        className="home-img"
      />
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderAllComponents = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderHome()
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  onChangeInput = event => this.setState({inputUsername: event.target.value})

  onClickSearch = () => {
    const {changeUsername} = this.context
    const {inputUsername} = this.state
    if (inputUsername === '') {
      this.setState({
        isActiveError: true,
        errorMsg: 'Enter the valid github username',
        userData: [],
      })
    } else {
      changeUsername(inputUsername)
      this.getUserProfile(inputUsername)
      this.setState({isActiveError: false, errorMsg: ''})
    }
  }

  render() {
    return (
      <UsernameContext.Consumer>
        {value => {
          const {username, changeUsername} = value
          const {errorMsg, isActiveError, inputUsername, userData} = this.state
          const isListEmpty = userData.length === 0

          const onClickSearch = () => {
            if (inputUsername === '') {
              this.setState({
                isActiveError: true,
                errorMsg: 'Enter the valid github username',
                userData: [],
              })
            } else {
              changeUsername(inputUsername)
              this.getUserProfile(inputUsername)
              this.setState({isActiveError: false, errorMsg: ''})
            }
          }

          return (
            <>
              <Header />
              <div className="home-bg-container">
                <div className="display-content">
                  <div className="input-with-err">
                    <div className="home-search-container">
                      <input
                        role="searchbox"
                        aria-label="GitHub Username"
                        type="search"
                        placeholder="Enter github username"
                        onChange={this.onChangeInput}
                        value={inputUsername}
                        className={`input ${isActiveError ? 'err' : ''}`}
                      />
                      <button
                        type="button"
                        className="search-icon-container"
                        onClick={onClickSearch}
                        data-testid="searchButton"
                        aria-label="Search GitHub username"
                      >
                        <HiOutlineSearch className="search-icon" />
                      </button>
                    </div>
                    {isActiveError && <p className="errorMsg">{errorMsg}</p>}
                  </div>
                  {isListEmpty ? this.renderHome() : this.renderAllComponents()}
                </div>
              </div>
            </>
          )
        }}
      </UsernameContext.Consumer>
    )
  }
}

Home.contextType = UsernameContext

export default Home
