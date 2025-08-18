import {Component} from 'react'
import Header from '../Header'
import Profile from '../Profile'

import './index.css'

class Home extends Component {
  renderHome = () => (
    <div className="home-img-container">
      <h1 className="home-Heading">Github Profile Visualizer</h1>
      <img
        src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755488846/Group_2_rfvoc5.png"
        alt="home"
        className="home-img"
      />
    </div>
  )

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="display-content">
          <div className="home-search-container">
            <input
              type="text"
              placeholder="Enter github username"
              className="input"
            />
            <div className="search-icon-container">
              <img
                src="https://res.cloudinary.com/dqtskutwx/image/upload/v1754110606/search-sm_z8aesi.png"
                alt="search icon"
                className="search-icon"
              />
            </div>
          </div>
          {}
          <Profile />
        </div>
      </div>
    )
  }
}

export default Home
