import React, { Component } from 'react'
import './App.css'
import Page from './containers/Page'
import API from './adapters/API'
import { Route, withRouter } from 'react-router-dom'
import SignInForm from './components/SignInForm'

class App extends Component {
  state = {
    currentUser: undefined,
    currentUserId: undefined,
    galleries: []
  }

  setGalleriesState = (galleryData) => {
    this.setState({galleries: galleryData}, () => console.log(this.state.galleries))
  }

  signin = user => {
    fetch(`http://localhost:3000/api/v1/users/${user.id}/galleries`)
    .then(res => res.json())
    .then(galleryData => this.setState({galleries: galleryData, currentUser: user.email, currentUserId: user.id}))
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

  // getWallInfo = (wall) => {
  //  const wallindex = ["Wall 1", "Wall 2", "Wall 3"].indexOf(wall)
  //  return fetch(`http://localhost:3000/api/v1/users/${this.state.currentUserId}/galleries`)
  //   .then(res => res.json())
  //   .then(data => this.setState({
  //     galleries: data
  //   }))

  // }

  render () {
    const { signin, signout } = this
    return (
      <div className='App'>
        <Page
        signin={signin}
        signout={signout}  
        currentUser={this.state.currentUser} 
        currentUserId={this.state.currentUserId} 
        galleries={this.state.galleries}
        setGalleriesState={this.setGalleriesState} 
        />

      </div>
    )
  }
}

export default withRouter(App)
