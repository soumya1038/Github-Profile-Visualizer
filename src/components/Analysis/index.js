import {Component} from 'react'
import Loader from 'react-loader-spinner'
// import {Link} from 'react-router-dom'

import Header from '../Header'
import UsernameContext from '../../UsernameContext'
import NoDataFound from '../NoDataFound'
import LinearChart from '../LinearChart'
import Piechart from '../Piechart'
import NoInternet from '../NoInternet'

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
    repositoryData: [],
  }

  componentDidMount() {
    const {username} = this.context
    if (username === '') {
      this.renderNoRepoFound()
    } else {
      this.renderGetRepoData()
    }
  }

  renderGetRepoData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {username} = this.context
    const apiurl = `https://apis2.ccbp.in/gpv/profile-summary/${username}?api_key=${process.env.REACT_APP_GIT_TOKEN}`
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
    <NoDataFound repoName="analysis" alt="empty analysis" />
  )

  onclickRetry = () => {
    const {username} = this.context
    this.renderGetRepoData(username)
  }

  renderFailureView = () => <NoInternet onclickRetry={this.onclickRetry} />

  renderSuccess = () => {
    const {repositoryData} = this.state
    // Convert object → array for recharts
    const chartData = Object.entries(repositoryData.quarterCommitCount).map(
      ([key, value]) => ({
        name: key,
        commits: value,
      }),
    )
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

    return (
      <div>
        <h1>Analysis</h1>
        <div>
          <h1>{user.login}</h1>
          <img src={user.avatarUrl} alt={user.login} className="repo-image" />
        </div>
        <LinearChart data={chartData} />
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
