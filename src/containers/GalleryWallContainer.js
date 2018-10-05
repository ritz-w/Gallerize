import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import GalleryWall from './GalleryWall';



export default class GalleryWallContainer extends Component {
    // state = {
    //     activeItem: 1
    // }

  renderWall = () => {
    // return (this.props.currentWall === 1) ? 
        return <GalleryWall wallId={0}
        className="full-screenable-node" 
        currentUserId={this.props.currentUserId}
        galleryInfo={this.props.galleries[0]}
        deleteArtwork={this.props.deleteArtwork} 
        setGalleriesState={this.props.setGalleriesState}
        // captions={this.props.captions.wall1}
        editCaption={this.props.editCaption} 
        deleteCaption={this.props.deleteCaption} 
        // // titles={this.props.titles.wall1} 
        // editTitle={this.props.editTitle} 
    //     // deleteTitle={this.props.deleteTitle} 
        />
    //  : (this.props.currentWall === 2) ?
    //     <GalleryWall wallId={1} 
    //     className="full-screenable-node" 
    //     />
    // :  <GalleryWall wallId={2}
        //     className="full-screenable-node" 
        // />
  }

  handleClick = (e, {name}) => {
    this.setState({ activeItem: parseInt(name) }, () => this.props.handleWallChange(this.state.activeItem))
  }

  render() {
    return (
        <div>
        {/* //     <Menu attached='top' tabular>
        //         <Menu.Item name={"1"} active={this.state.activeItem === 1} onClick={this.handleClick} />
        //         <Menu.Item name={"2"} active={this.state.activeItem === 2} onClick={this.handleClick} />
        //         <Menu.Item name={"3"} active={this.state.activeItem === 3} onClick={this.handleClick} />
        //     </Menu> */}
            { this.renderWall() }
            

        </div>
    )
  }
}