import {Component} from 'react'
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import UsernameContext from '../../UsernameContext'
import NoDataFound from '../NoDataFound'
import Piechart from '../Piechart'
import NoInternet from '../NoInternet'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RepositoryDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoryData: [],
  }
  // repoName: '',

  componentDidMount() {
    const {
      params: {repoName},
    } = this.props
    if (repoName === '') {
      this.renderNoRepoFound()
    } else {
      this.getRepoDetails()
    }
    // console.log(repoName)
  }

  getRepoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {
      params: {repoName},
    } = this.props

    const {username} = this.context
    const apiurl = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}?api_key=${process.env.REACT_APP_GIT_TOKEN}`
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
      // console.log(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderNoRepoFound = () => (
    <NoDataFound repoName="Repositories" alt="empty repositories" />
  )

  onclickRetry = () => this.getRepoDetails()

  renderFailureView = () => <NoInternet onclickRetry={this.onclickRetry} />

  renderSuccess = () => {
    const {repositoryData} = this.state
    // console.log(repositoryData)

    return (
      <div className="repo-success-container">
        <div>
          <h1 className="repo-title">{repositoryData.name}</h1>
          <img
            src={repositoryData.owner.avatar_url}
            alt={repositoryData.owner.login}
            className="repo-image"
          />
        </div>
        <p className="repo-description">{repositoryData.description}</p>

        <ul className="language-tags">
          {repositoryData.lanuages.map(each => (
            <li key={each.value} className="language-tag">
              {each.name}
            </li>
          ))}
        </ul>

        <ul className="stats">
          <li className="stat-item">
            <img
              src="https://res.cloudinary.com/dqtskutwx/image/upload/v1757412650/Icon_e3w7ms.png"
              alt="star"
              className="stat-icon"
            />
            {repositoryData.stargazers_count}
          </li>
          <li className="stat-item">
            <img
              src="https://res.cloudinary.com/dqtskutwx/image/upload/v1757412650/Git_3_bax2ip.png"
              alt="fork"
              className="stat-icon"
            />
            {repositoryData.forks_count}
          </li>
        </ul>

        <div className="counts-container">
          <p className="count-label">Watchers Counts</p>
          <p>{repositoryData.watchers_count}</p>
          <div className="count-box">
            <p className="count-label">Commits Count</p>
            <p className="count-value">{repositoryData.network_count}</p>
          </div>
          <div className="count-box">
            <p className="count-label">Issues Counts</p>
            <p className="count-value">{repositoryData.open_issues_count}</p>
          </div>
        </div>

        <div className="contributors-section">
          <h1 className="contributors-title">Contributors</h1>
          <p className="contributors-count">
            {repositoryData.contributors.length} Members
          </p>
          <ul className="contributors-list">
            {repositoryData.contributors.slice(0, 5).map(img => (
              <li key={img.id} className="contributor-item">
                <img
                  src={img.avatar_url}
                  alt="contributor profile"
                  className="contributor-img"
                />
              </li>
            ))}
            {repositoryData.contributors.length > 5 && (
              <li className="contributor-item more">
                +{repositoryData.contributors.length - 5}
              </li>
            )}
          </ul>
        </div>

        <div className="languages-section">
          <h1 className="languages-title">Languages</h1>
          <Piechart data={repositoryData.lanuages} />
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
        <div className="repo-details-container">
          {this.renderAllComponents()}
        </div>
      </>
    )
  }
}

RepositoryDetails.contextType = UsernameContext

// Step 2: Create a wrapper HOC using useParams
const RepositoryDetailsWrapper = props => {
  const params = useParams()
  return <RepositoryDetails {...props} params={params} />
}

export default RepositoryDetailsWrapper
