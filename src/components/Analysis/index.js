import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'
import UsernameContext from '../../UsernameContext'
import NoDataFound from '../NoDataFound'
import LinearChart from '../LinearChart'
import Piechart from '../Piechart'
// import NoInternet from '../NoInternet'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Analysis extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoryData: {},
  }

  componentDidMount() {
    const {username} = this.context
    if (username === '') {
      this.renderNoRepoFound()
    } else {
      this.getAnalysisData()
    }
  }

  getAnalysisData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {username} = this.context
    const apiurl = `https://apis2.ccbp.in/gpv/profile-summary/${username}`
    const options = {
      method: 'GET',
      headers: {},
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
    <NoDataFound repoName="analysis" alt="empty analysis" />
  )

  onclickRetryAnalysis = () => this.getAnalysisData()

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
        onClick={this.onclickRetryAnalysis}
      >
        Try Again
      </button>
    </div>
  )

  renderSuccess = () => {
    const {repositoryData} = this.state
    // Convert object → array for recharts

    const quarterCommitSlicedData = Object.entries(
      repositoryData.quarterCommitCount,
    ).map(([key, value]) => ({
      name: key,
      quarterCommitCount: value, // <-- must match test
    }))

    const langRepoData = Object.entries(repositoryData.langRepoCount).map(
      ([name, value]) => ({
        name,
        value,
      }),
    )

    const langCommitData = Object.entries(repositoryData.langRepoCount).map(
      ([name, value]) => ({
        name,
        value,
      }),
    )

    const repoCommitData = Object.entries(repositoryData.repoCommitCount).map(
      ([name, value]) => ({
        name,
        value,
      }),
    )

    const {user} = repositoryData
    const analysisListLength = Object.keys(repoCommitData).length === 0

    return (
      <div>
        {analysisListLength ? (
          <div>
            <img
              src="https://res.cloudinary.com/dqtskutwx/image/upload/v1757397146/Layer_3_2x_dybiao.png"
              alt="no analysis"
            />
            <h1 className="noDataHeading">No Analysis Found!</h1>
          </div>
        ) : (
          <div>
            <h1>Analysis</h1>
            <Link to="/">Home</Link>
            <div>
              <h1>{user.login}</h1>
              <img
                src={user.avatarUrl}
                alt={user.login}
                className="repo-image"
              />
            </div>
            <LinearChart quarterCommitCount={quarterCommitSlicedData} />
            <div>
              <div>
                <h1>Language Per Repos</h1>
                <Piechart data={langRepoData} />
              </div>

              <div>
                <h1>Language Per Commits</h1>
                <Piechart data={langCommitData} />
              </div>

              <div>
                <h1>Commits Per Repo</h1>
                <Piechart data={repoCommitData} />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
  // <Piechart data={repositoryData.langCommitCount} />
  // {repositoryData.quarterCommitCount}

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

Analysis.contextType = UsernameContext

export default Analysis
