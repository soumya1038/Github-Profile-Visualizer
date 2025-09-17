import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import UsernameContext from './UsernameContext'
import Home from './components/Home'
import Repository from './components/Repository'
import RepositoryDetails from './components/RepositoryDetails'
import Analysis from './components/Analysis'
import NotFound from './components/NotFound'
import './App.css'

// console.log(NotFound)

class App extends Component {
  state = {username: ''}

  onChangeUsername = username => this.setState({username})

  render() {
    const {username} = this.state
    return (
      <UsernameContext.Provider
        value={{
          username,
          changeUsername: this.onChangeUsername,
        }}
      >
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Home username={username} />}
          />
          <Route exact path="/repositories" component={Repository} />
          <Route
            exact
            path="/repositories/:repoName"
            component={RepositoryDetails}
          />
          <Route exact path="/analysis" component={Analysis} />
          <Route component={NotFound} />
        </Switch>
      </UsernameContext.Provider>
    )
  }
}

export default App
