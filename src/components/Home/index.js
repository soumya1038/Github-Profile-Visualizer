import {HiOutlineSearch} from 'react-icons/hi'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import UsernameContext from '../../UsernameContext'
import Header from '../Header'
import Profile from '../Profile'
// import NoInternet from '../NoInternet'

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
    // const {username} = this.context
    console.log('Home Profile-details triggrt')
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      isActiveError: false,
    })
    const githubProfileUrl = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=`
    console.log(githubProfileUrl)

    const response = await fetch(githubProfileUrl)
    // console.log(response)
    const data = await response.json()
    if (response.ok === true) {
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
        apiStatus: apiStatusConstants.failure,
        errorMsg: data.error_msg,
        isActiveError: true,
      })
    }
  }

  renderProfile = () => {
    const {userData} = this.state
    return <Profile userData={userData} />
  }

  renderHomeFailureView = () => {
    // const {username} = this.context
    return (
      <div className="nointernet-container">
        <img
          src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755620244/Frame_8830_1_kgnu6z.png"
          alt="failure view"
          className="nointernet-img"
        />
        <p className="nointernet-heading">
          Something went wrong. Please try again
        </p>
        <button type="button" data-testid="home-retry-button">
          Try Again
        </button>
      </div>
    )
  }
  //   onClick={() => {
  //     this.getUserProfile(username)
  //   }}

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
        return this.renderHomeFailureView()
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
          const {errorMsg, isActiveError, inputUsername} = this.state

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
                        type="search"
                        placeholder="Enter github username"
                        onChange={this.onChangeInput}
                        value={inputUsername || username}
                        className={`input ${isActiveError ? 'err' : ''}`}
                      />
                      <button
                        type="button"
                        className="search-icon-container"
                        onClick={onClickSearch}
                        data-testid="searchButton"
                      >
                        <HiOutlineSearch className="search-icon" />
                      </button>
                    </div>
                    {isActiveError && <p className="errorMsg">{errorMsg}</p>}
                  </div>
                  {this.renderAllComponents()}
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
