import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import GalleryWall from './GalleryWall';



export default class GalleryWallContainer extends Component {
    state = { activeItem: 'gallery1' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name }, () => this.props.handleChangeWall(this.activeItem))
  }

  renderWall = () => {
      this.state.activeItem
  }

  render() {
    const { activeItem } = this.state

    return (
        <div>
            <Menu tabular>
                <Menu.Item name='gallery1' active={activeItem === 'gallery1'} onClick={this.handleItemClick} />
                <Menu.Item name='gallery2' active={activeItem === 'gallery2'} onClick={this.handleItemClick} />
            </Menu>

            {/* <GalleryWall wallId="gallery1" className="full-screenable-node" onChange={this.props.saveGallery} selectedArtworks={this.props.selectedArtworks} captions={this.props.captions} editCaption={this.props.editCaption} deleteCaption={this.props.deleteCaption} titles={this.props.titles} editTitle={this.props.editTitle} deleteTitle={this.props.deleteTitle} deleteArtwork={this.props.deleteArtwork} /> */}
            <GalleryWall className="full-screenable-node" onChange={this.props.saveGallery} selectedArtworks={this.props.selectedArtworks} captions={this.props.captions} editCaption={this.props.editCaption} deleteCaption={this.props.deleteCaption} titles={this.props.titles} editTitle={this.props.editTitle} deleteTitle={this.props.deleteTitle} deleteArtwork={this.props.deleteArtwork} />

        </div>
    )
  }
}