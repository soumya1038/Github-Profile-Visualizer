import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'
import UsernameContext from '../../UsernameContext'
import NoDataFound from '../NoDataFound'
import NoInternet from '../NoInternet'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Repository extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoryData: [],
  }

  componentDidMount() {
    const {username} = this.context
    // const username = 'soumya1038'
    if (username === '') {
      this.renderNoRepoFound()
    } else {
      this.renderGetRepoData()
    }
    // console.log(username)
  }

  renderGetRepoData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {username} = this.context
    // const username = 'soumya1038'
    const apiurl = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=${process.env.REACT_APP_GIT_TOKEN}`
    const options = {
      headers: {},
      method: 'GET',
    }
    const response = await fetch(apiurl, options)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        apiStatus: apiStatusConstants.success,
        repositoryData: data,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderNoRepoFound = () => (
    <NoDataFound repoName="Repositories" alt="empty repositories" />
  )

  onclickRetry = () => {
    const {username} = this.context
    this.renderGetRepoData(username)
  }

  renderFailureView = () => <NoInternet onclickRetry={this.onclickRetry} />

  renderSuccess = () => {
    const {repositoryData} = this.state
    return (
      <div className="repository-container">
        <h1 key="title">Repositories</h1>
        <div className="repository-list">
          <ul>
            {repositoryData.map(repo => (
              <li key={repo.id}>
                <Link
                  className="link"
                  key={repo.id}
                  to={`/repositories/${repo.name}`}
                >
                  <div className="repository-card">
                    <div>
                      <h1 className="repository-title">{repo.name}</h1>
                      <img
                        src={repo.owner.avatar_url}
                        alt={repo.owner.login}
                        className="repo-image"
                      />
                    </div>
                    <p className="repository-description">{repo.description}</p>

                    <div className="language-tags">
                      {repo.languages.map(tags => (
                        <span
                          key={tags.value}
                          className={`language-tag ${tags.name.toLowerCase()}`}
                        >
                          {tags.name}
                        </span>
                      ))}
                    </div>
                    <ul className="stats">
                      <li>
                        <img
                          src="https://res.cloudinary.com/dqtskutwx/image/upload/v1757412650/Icon_e3w7ms.png"
                          alt="star"
                        />
                        {repo.stargazers_count}
                      </li>
                      <li>
                        <img
                          src="https://res.cloudinary.com/dqtskutwx/image/upload/v1757412650/Git_3_bax2ip.png"
                          alt="fork"
                        />
                        {repo.forks_count}
                      </li>
                    </ul>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  )

  renderAllComponents = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderNoRepoFound()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="repository-container">{this.renderAllComponents()}</div>
      </>
    )
  }
}

Repository.contextType = UsernameContext

export default Repository
