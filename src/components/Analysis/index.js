import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'
import UsernameContext from '../../UsernameContext'
import NoDataFound from '../NoDataFound'
import LinearChart from '../LinearChart'
import Piechart from '../Piechart'
import CommitGraph from '../NodeBox'
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
      this.getAnalysisData(username)
    }
  }

  getAnalysisData = async username => {
    console.log('analysis trigger')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    // const {username} = this.context
    const apiurl = `https://apis2.ccbp.in/gpv/profile-summary/${username}?api_key=`
    console.log(apiurl)

    const response = await fetch(apiurl)
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

  renderAnalysisFailureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dqtskutwx/image/upload/v1755620244/Frame_8830_1_kgnu6z.png"
        alt="failure view"
        className="nointernet-img"
      />
      <p className="nointernet-heading">
        Something went wrong. Please try again
      </p>
      <button type="button" data-testid="analysis-retry">
        Try Again
      </button>
    </div>
  )
  // onClick={() => {
  //   this.getAnalysisData(this.context.username)
  // }}

  renderSuccess = () => {
    const {repositoryData} = this.state
    // Convert object → array for recharts

    const quarterCommitSlicedData = Object.entries(
      repositoryData.quarterCommitCount,
    ).map(([key, value]) => ({
      name: key,
      quarterCommitCount: value,
    }))

    const quarterCommitData = Object.entries(
      repositoryData.quarterCommitCount,
    ).map(([key, value]) => ({
      date: key,
      count: value,
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
    // const commitData = Object.entries(repositoryData.quarterCommitCount).map(
    //   ([name, value]) => ({
    //     name,
    //     value,
    //   }),
    // )

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
            <div className="user-container">
              <h1 className="user-name">{user.login}</h1>
              <img
                src={user.avatarUrl}
                alt={user.login}
                className="user-image"
              />
            </div>
            <div>
              <p>Count</p>
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
              <div>
                <h1 className="commit-graph-title">Commit History</h1>
                <CommitGraph data={quarterCommitData} />
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
        return this.renderAnalysisFailureView()
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
