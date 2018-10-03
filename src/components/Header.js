import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'
import './Header.css'



const Header = (props) => {
    return (
        <div>
            <h1 className="site-title">Gallerize</h1>
            <Menu secondary className="nav-menu">
                <Menu.Item name='Sign In' >
                Sign In
                </Menu.Item>

                <Menu.Item onClick={props.toggleArtSelector} name='Toggle Artwork Selector'>
                </Menu.Item>

                <Dropdown item text='Add Text Elements'>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => props.addCaption()}>Add Caption</Dropdown.Item>
                        <Dropdown.Item onClick={() => props.addTitle()}>Add Title</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Menu.Item onClick={props.exportGallery} name='Export'>
                </Menu.Item>
                <Menu.Item onClick={props.enableFullScreen} name='See Full Screen'>
                </Menu.Item>
      </Menu>
        </div>
    )
}

export default Header;