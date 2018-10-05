import React from 'react'

import {Button, Form} from 'semantic-ui-react'

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
          signin(data)
        }
      })
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  render () {
    const { email, password } = this.state
    const { handleChange, handleSubmit } = this

    return (
      <Form>
        <Form.Field>
          <label>Email</label>
        <Form.Input
          placeholder="Enter Email"
          id='signUpEmailInput'
          value={email}
          onClick={e => e.stopPropagation()}
          onChange={handleChange}
          margin='normal'
          name='email'
        />
        </Form.Field>
        <Form.Field>
        <label>Password</label>
        <Form.Input 
          placeholder="Enter Password"
          id='signUpPasswordInput'
          onClick={e => e.stopPropagation()}
          value={password}
          onChange={handleChange}
          margin='normal'
          name='password'
          type='password'
        />
        </Form.Field>
        <Button onClick={handleSubmit} variant='contained'>
          Sign Up
        </Button>
      </Form>
    )
  }
}

export default SignUpForm
