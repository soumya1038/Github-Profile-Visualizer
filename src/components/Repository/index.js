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
    repositoryData: {},
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

  // getOwner = owner => ({
  //   avatarUrl: owner.avatar_url,
  //   login: owner.login,
  // })

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
      const updatedData = data.map(eachItem => ({
        description: eachItem.description,
        forksCount: eachItem.forks_count,
        languages: eachItem.languages.map(each => ({
          name: each.name,
          value: each.value,
        })),
        name: eachItem.name,
        owner: eachItem.owner,
        stargazersCount: eachItem.stargazers_count,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        repositoryData: updatedData,
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

  renderFailureView = () => (
    <div className="nointernet-container">
      <img
        src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755620244/Frame_8830_1_kgnu6z.png"
        alt="failure view"
        className="nointernet-img"
      />
      <p className="nointernet-heading">
        Something went wrong. Please try again
      </p>
      <button
        className="try-again-button"
        type="button"
        onClick={this.onclickRetry}
      >
        Try Again
      </button>
    </div>
  )

  renderSuccess = () => {
    const {repositoryData} = this.state
    const repositoriesLength = Object.keys(repositoryData).length === 0
    return (
      <div>
        {repositoriesLength ? (
          <div>
            <img
              src="https://res.cloudinary.com/dqtskutwx/image/upload/v1757397146/Layer_3_2x_dybiao.png"
              alt="no repositories"
            />
            <h1 className="noDataHeading">No Repositories Found!</h1>
          </div>
        ) : (
          <div className="repository-container">
            <h1 key="title">Repositories</h1>
            <div className="repository-list">
              <ul>
                {repositoryData.map(repo => {
                  const {
                    name,
                    description,
                    languages,
                    stargazersCount,
                    forksCount,
                    owner,
                  } = repo
                  const {login} = owner

                  return (
                    <li key={name}>
                      <Link className="link" to={`/repositories/${name}`}>
                        <div className="repository-card">
                          <div>
                            <h1 className="repository-title">{name}</h1>
                            <img
                              src={owner.avatar_url}
                              alt={login}
                              className="repo-image"
                            />
                          </div>
                          <p className="repository-description">
                            {description}
                          </p>

                          <div className="language-tags">
                            {languages.map(tags => (
                              <p
                                key={tags.value}
                                className={`language-tag ${tags.name.toLowerCase()}`}
                              >
                                {tags.name}
                              </p>
                            ))}
                          </div>
                          <div className="stats">
                            <div>
                              <img
                                src="https://res.cloudinary.com/dqtskutwx/image/upload/v1757412650/Icon_e3w7ms.png"
                                alt="star"
                              />
                              <p>{stargazersCount}</p>
                            </div>
                            <div>
                              <img
                                src="https://res.cloudinary.com/dqtskutwx/image/upload/v1757412650/Git_3_bax2ip.png"
                                alt="fork"
                              />
                              <p>{forksCount}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}
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
