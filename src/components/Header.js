import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import './Header.css'
import SignInForm from './SignInForm.js'
import SignUpForm from './SignUpForm.js'

class Header extends React.Component {

  
render () {
  return (
    <div>
      <h1 className='site-title'>Gallerize</h1>
      <Menu secondary className='nav-menu'>

        { this.props.currentUser ?

        <Dropdown item text='My Account'>
            <Dropdown.Menu>
            <Dropdown.Item>Welcome, {this.props.currentUser} !</Dropdown.Item>
            <Dropdown.Item onClick={this.props.signout}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          : 
          
        <Dropdown item text='Sign In / Sign Up'>
            <Dropdown.Menu>
                <Dropdown item text='Sign In'>
                    <Dropdown.Menu>
                         <Dropdown.Item><SignInForm signin={this.props.signin} /></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown item text='Sign Up'>
                    <Dropdown.Menu>
                         <Dropdown.Item><SignUpForm signup={this.props.signup} signin={this.props.signin} /></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Dropdown.Menu>
        </Dropdown>
        }

        <Menu.Item onClick={this.props.toggleArtSelector} name='Toggle Artwork Selector' />

        <Dropdown item text='Add Text Elements'>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => this.props.addCaption(this.props.currentWall)}>Add Caption</Dropdown.Item>
            <Dropdown.Item onClick={() => this.props.addTitle(this.props.currentWall)}>Add Title</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item name='Export'>
        </Menu.Item>
        <Menu.Item onClick={this.props.enableFullScreen} name='See Full Screen'>
        </Menu.Item>
      </Menu>
    </div>
  )
}
}

export default Header
