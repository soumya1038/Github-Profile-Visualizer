import {Component} from 'react'
import Loader from 'react-loader-spinner'
// import {Link} from 'react-router-dom'

import Header from '../Header'
import UsernameContext from '../../UsernameContext'
import NoDataFound from '../NoDataFound'
import RepoCard from '../RepoCard'
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
      this.getRepositoryData(username)
    }
    // console.log(username)
  }

  getRepositoryData = async username => {
    console.log('Repository triger')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    // const {username} = this.context
    const reposUrl = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=`
    console.log(reposUrl)

    const response = await fetch(reposUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.map(eachItem => ({
        description: eachItem.description,
        forksCount: eachItem.forks_count,
        languages: eachItem.languages.map(each => ({
          name: each.name,
          value: each.value,
        })),
        id: eachItem.id,
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

  renderRepositoryFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755620244/Frame_8830_1_kgnu6z.png"
        alt="failure view"
        className="nointernet-img"
      />
      <p className="nointernet-heading">
        Something went wrong. Please try again
      </p>
      <button type="button" data-testid="repository-retry">
        Try Again
      </button>
    </div>
  )
  // onClick={() => {
  //   this.getRepositoryData(this.context.username)
  // }}

  renderSuccess = () => {
    const {repositoryData} = this.state
    // console.log(repositoryData)
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
            <div className="owner-details">
              <img
                src={repositoryData[0]?.owner?.avatar_url}
                alt={repositoryData[0]?.owner?.login}
                className="owner-avatar"
              />
              <h1>{repositoryData[0]?.owner?.login}</h1>
            </div>
            <div className="repository-list">
              <div>
                {repositoryData.map(repo => (
                  <RepoCard repositoryDetails={repo} key={repo.id} />
                ))}
              </div>
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
        return this.renderRepositoryFailureView()
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
