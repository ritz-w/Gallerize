import React, { Component } from 'react'
import './App.css'
import Page from './containers/Page'
import API from './adapters/API'
import { Route, withRouter } from 'react-router-dom'
import SignInForm from './components/SignInForm'

class App extends Component {
  state = {
    currentUser: undefined
  }

  signin = email => {
    this.setState({ currentUser: email })
    // this.props.history.push('/users')
  }

  signout = () => {
    this.setState({ currentUser: undefined })
    localStorage.removeItem('token')
  }

  componentDidMount () {
    const token = localStorage.getItem('token')
    if (token) {
      API.validate(token)
        .then(data => {
          if (data.email) {
            this.signin(data.email)
          }
        })
    }
  }

  render () {
    const { signin, signout } = this
    const { currentUser } = this.state
    return (
      <div className='App'>
        <Page
        signin={signin} signout={signout} currentUser={currentUser}
        />

      </div>
    )
  }
}

export default withRouter(App)
