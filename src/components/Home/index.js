import {HiOutlineSearch} from 'react-icons/hi'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import NoInternet from '../NoInternet'
import NoDataFound from '../NoDataFound'

import './index.css'

class Home extends Component {
  state = {username: ''}

  onChangeInput = event => this.setState({username: event.target.value})

  onClickSearch = () => {
    // const {username} = this.state
    // console.log(username)
    this.getUserProfile()
    // this.setState({username: ''})
  }

  getUserProfile = async () => {
    const {username} = this.state
    const apiUrl = `https://apis2.ccbp.in/gpv/profile-summary/${username}`

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization if required
          // Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Profile Details:', data)

      // ✅ Store the data in state so UI updates
      // this.setState({profileData: data})
    } catch (error) {
      console.error('Error fetching profile details:', error)
      // Optionally handle error in state too
      // this.setState({errorMsg: error.message})
    }
  }

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

  render() {
    const {username} = this.state
    return (
      <div className="home-bg-container">
        <Header />
        <div className="display-content">
          <div className="home-search-container">
            <input
              type="text"
              placeholder="Enter github username"
              onChange={this.onChangeInput}
              value={username}
              className="input"
            />
            <button
              type="button"
              className="search-icon-container"
              onClick={this.onClickSearch}
              data-testid="searchButton"
            >
              <HiOutlineSearch className="search-icon" />
            </button>
          </div>
          {this.renderLoader()}
        </div>
      </div>
    )
  }
}

// <img
//   src="https://res.cloudinary.com/dqtskutwx/image/upload/v1754110606/search-sm_z8aesi.png"
//   alt="search icon"
//   className="search-icon"
// />
// <NoDataFound />
// <NoInternet />
// <Profile />
export default Home
