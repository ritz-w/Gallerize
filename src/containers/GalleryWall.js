import React, { Component } from 'react';
import './GalleryWall.css';
import Draggable from 'react-draggable';
// import { Resizable, ResizableBox } from 'react-resizable';
import Resizable from 're-resizable'
import Caption from '../components/Caption'
import Title from '../components/Title'
import ArtworkImage from '../components/ArtworkImage'


export default class GalleryWall extends Component {

    renderSelectedArtworks = () => {
        return this.props.selectedArtworks.map(artwork => {
            return (
                <Draggable
                    defaultPosition={{x: 0, y: 0}}>
                    <Resizable
                      defaultSize={{
                        width: 200,
                        height: 360
                      }}
                      style={{
                        background: `url(${artwork.image})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        position: 'absolute'
                      }}
                      lockAspectRatio={true}
                    >
                        <ArtworkImage artwork={artwork} deleteArtwork={this.props.deleteArtwork}>
                        </ArtworkImage>
                    </Resizable>
                  </Draggable>
            )
        })
    }

    renderCaptions = () => {
        return this.props.captions.map(caption => {
            return (
                <Draggable
                enableUserSelectHack={false}
                defaultPosition={{x: 0, y: 0}}>
                <Resizable
                  defaultSize={{
                    width: 200,
                    height: 360
                  }}
                  style={{
                    position: 'absolute'
                  }}
                >
                <div>
                    <Caption editCaption={this.props.editCaption} caption={caption} deleteCaption={this.props.deleteCaption} />
                </div>
              </Resizable>
              </Draggable>
            )
        })
    }

    renderTitles = () => {
        return this.props.titles.map(title => {
            return (
                <Draggable
                enableUserSelectHack={false}
                defaultPosition={{x: 0, y: 0}}>
                <Resizable
                  defaultSize={{
                    width: 400,
                    height: 260
                  }}
                  style={{
                    position: 'absolute'
                  }}
                >
                <div>
                    <Title editTitle={this.props.editTitle} title={title} deleteTitle={this.props.deleteTitle} />
                </div>
              </Resizable>
              </Draggable>
            )
        })
    }

    render () {
        return (
            <div className="gallery-wall-container">
            {this.renderSelectedArtworks()}
            {this.renderCaptions()}
            {this.renderTitles()}
          </div>
        )
    }
}