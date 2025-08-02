import {Component} from 'react'
import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <div className="home search-container">
            <input type="text" placeholder="Enter github username" />
            <img
              src="https://res.cloudinary.com/dqtskutwx/image/upload/v1754110044/Frame_8831_wne6pq.png"
              alt="search icon"
            />
          </div>
          <img
            src="https://res.cloudinary.com/dqtskutwx/image/upload/v1754109829/Frame_8830_nowtl7.png"
            alt="home"
          />
        </div>
      </div>
    )
  }
}

export default Home
