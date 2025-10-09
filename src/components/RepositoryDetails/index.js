import {Component} from 'react'
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import UsernameContext from '../../UsernameContext'
import NoDataFound from '../NoDataFound'
import Piechart from '../Piechart'
// import NoInternet from '../NoInternet'
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
    repositoryData: {},
  }
  // repoName: '',

  componentDidMount() {
    const {username} = this.context
    const {
      params: {repoName},
    } = this.props
    if (repoName === '') {
      this.renderNoRepoFound()
    } else {
      this.getRepositoryDetails(username, repoName)
    }
    // console.log(repoName)
  }

  getOwner = owner => ({
    avatarUrl: owner.avatar_url,
    login: owner.login,
  })

  getRepositoryDetails = async (username, repoName) => {
    console.log('repo-details (specific-repo) trigger')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    // const {
    //   params: {repoName},
    // } = this.props

    // const {username} = this.context
    const repoDetailsUrl = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}?api_key=`
    console.log(repoDetailsUrl)

    const response = await fetch(repoDetailsUrl)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updatedData = {
        name: data.name,
        description: data.description,
        languages: data.lanuages || [],
        stargazersCount: data.stargazers_count,
        forksCount: data.forks_count,
        commitsCount: data.network_count,
        issuesCount: data.open_issues_count,
        contributors: (data.contributors || []).map(contributor => ({
          avatarUrl: contributor.avatar_url,
          id: contributor.id,
        })),
        owner: this.getOwner(data.owner),
        watchersCount: data.watchers_count,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        repositoryData: updatedData,
      })
      // console.log(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderNoRepoFound = () => (
    <NoDataFound repoName="Repositories" alt="empty repositories" />
  )

  renderRepositoryDetailsFailureView = () => {
    const {
      params: {repoName},
    } = this.props

    const {username} = this.context
    return (
      <div>
        <img
          src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755620244/Frame_8830_1_kgnu6z.png"
          alt="failure view"
          className="nointernet-img"
        />
        <p className="nointernet-heading">
          Something went wrong. Please try again
        </p>
        <button type="button" data-testid="repo-details-retry">
          Try Again
        </button>
      </div>
    )
  }
  // onClick={() => {
  //   this.getRepositoryDetails(username, repoName)
  // }}

  renderSuccess = () => {
    const {repositoryData} = this.state
    const {
      name,
      description,
      languages,
      forksCount,
      stargazersCount,
      watchersCount,
      issuesCount,
      contributors,
      owner,
    } = repositoryData
    const {avatarUrl, login} = owner

    return (
      <div className="repo-success-container">
        <div className="user-repodetails-container">
          <h1 className="repo-title">{name}</h1>
          <img src={avatarUrl} alt={login} className="repo-image" />
        </div>
        <p className="repo-description">{description}</p>

        <div className="language-tags">
          {languages.map(each => (
            <p key={each.value} className="language-tag">
              {each.name}
            </p>
          ))}
        </div>

        <div className="stats">
          <div className="stat-item">
            <img
              src="https://res.cloudinary.com/dqtskutwx/image/upload/v1757412650/Icon_e3w7ms.png"
              alt="star"
              className="stat-icon"
            />
            <p>{stargazersCount}</p>
          </div>
          <div className="stat-item">
            <img
              src="https://res.cloudinary.com/dqtskutwx/image/upload/v1757412650/Git_3_bax2ip.png"
              alt="fork"
              className="stat-icon"
            />
            <p>{forksCount}</p>
          </div>
        </div>

        <div className="counts-container">
          <p className="count-label">Watchers Counts</p>
          <p>{watchersCount}</p>
          <div className="count-box">
            <p className="count-label">Commits Count</p>
            <p className="count-value">{repositoryData.network_count}</p>
          </div>
          <div className="count-box">
            <p className="count-label">Issues Counts</p>
            <p className="count-value">{issuesCount}</p>
          </div>
        </div>

        <div className="contributors-section">
          <h1 className="contributors-title">Contributors :</h1>
          <p className="contributors-count">{contributors.length} Members</p>
          <ul className="contributors-list">
            {contributors.slice(0, 5).map(img => (
              <li key={img.id} className="contributor-item">
                <img
                  src={img.avatarUrl}
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
          <h1 className="languages-title">Languages :</h1>
          <Piechart data={languages} />
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
        return this.renderRepositoryDetailsFailureView()
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
