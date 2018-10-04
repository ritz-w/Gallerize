import React from 'react'

import {Button, Form} from 'semantic-ui-react'

import API from '../adapters/API'
class SignInForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit = () => {
    const { email, password } = this.state
    const { signin } = this.props

    API.signin(email, password)
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
            id='emailInput'
            placeholder='Email'
            value={email}
            onChange={handleChange}
            onClick={e => e.stopPropagation()}
            margin='normal'
            name='email'
          />
        </Form.Field>
        <Form.Field>
        <label>Password</label>
        <Form.Input
          id='passwordInput'
          placeholder='Password'
          value={password}
          onChange={handleChange}
          onClick={e => e.stopPropagation()}
          margin='normal'
          name='password'
          type='password'
        />
        </Form.Field>
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          Sign In
        </Button>
      </Form>
    )
  }
}

export default SignInForm
