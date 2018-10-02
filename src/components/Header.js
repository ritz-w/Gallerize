import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import './Header.css'
import SignInForm from './SignInForm.js'
import SignUpForm from './SignUpForm.js'

class Header extends React.Component {

  state = {
    login: false
  }
  
render () {
  return (
    <div>
      <h1 className='site-title'>Gallerize</h1>
      <Menu secondary className='nav-menu'>

        { this.props.currentUser ?

          <div>
            <span> Welcome {this.props.currentUser} </span>
            <button onClick={this.props.signout}> Sign Out</button>
          </div>
          : 
          <div>
            <button onClick={() => this.setState({login: false})}> Sign Up</button>
            <button onClick={() => this.setState({login: true})}> Log In </button>

            {
              this.state.login ? 
                <SignInForm signin={this.props.signin} />
              :
              <SignUpForm signin={this.props.signin} />
            }
          </div>
        }

        <Menu.Item onClick={this.props.toggleArtSelector} name='Toggle Artwork Selector' />

        <Dropdown item text='Add Text Elements'>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => this.props.addCaption()}>Add Caption</Dropdown.Item>
            <Dropdown.Item onClick={() => this.props.addTitle()}>Add Title</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item name='Export' />
        <Menu.Item name='See Full Screen' />
      </Menu>
    </div>
  )
}
}

export default Header
