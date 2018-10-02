import React from 'react'

import {Button, Input} from 'semantic-ui-react'

import API from '../adapters/API'
class SignUpForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit = () => {
    const { email, password } = this.state
    const { signin } = this.props

    API.signup(email, password)
      .then(data => {
        if (data.error) {
          console.log("API",data)
        } else {
          console.log("data",data)
          localStorage.setItem('token', data.token)
          signin(data.email)
        }
      })
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  render () {
    const { email, password } = this.state
    const { handleChange, handleSubmit } = this

    return (
      <div>
        <Input
          id='emailInput'
          label='Email'
          value={email}
          onChange={handleChange}
          margin='normal'
          name='email'
        />
        <br />
        <Input
          id='passwordInput'
          label='Password'
          value={password}
          onChange={handleChange}
          margin='normal'
          name='password'
          type='password'
        />
        <br />
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          Sign Up
        </Button>
      </div>
    )
  }
}

export default SignUpForm
