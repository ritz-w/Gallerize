import React, { Component } from 'react';
import './GalleryWall.css';
import Draggable from 'react-draggable';
import Resizable from 're-resizable'
import Caption from '../components/Caption'
import Title from '../components/Title'
import ArtworkImage from '../components/ArtworkImage'


export default class GalleryWall extends Component {

    handleDragEvent = (e, data, artwork, wallId) => {
        debugger
        fetch("http://localhost:3000/api/v1/edit_artwork", {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                artwork_id: artwork.id,
                user_id: this.props.galleryInfo.user_id,
                gallery_wall: wallId,
                position_x: data.x,
                position_y: data.y
            })
        }).then(res => res.json())
        .then(data => console.log(data))
    }


    handleResizeEvent = (e, ref, artwork, wallId) => {
        debugger
        fetch("http://localhost:3000/api/v1/resize_artwork", {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                artwork_id: artwork.id,
                user_id: this.props.galleryInfo.user_id,
                gallery_wall: wallId,
                width: ref.offsetWidth,
                height: ref.offsetHeight,
            })
        }).then(res => res.json())
        .then(data => console.log(data))
    }

    renderSelectedArtworks = () => {
        return this.props.galleryInfo.user_selections.map(selection => {
            return (
                <Draggable
                    defaultPosition={{x: selection.x_position, y: selection.y_position}}
                    onStop={(event, data) => this.handleDragEvent(event, data, selection.artwork, selection.gallery_wall_id)}
                    >
                    <Resizable
                      defaultSize={{
                        width: selection.width,
                        height: selection.height
                      }}
                      style={{
                        background: `url(${selection.artwork.image})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        position: 'absolute'
                      }}
                      lockAspectRatio={true}
                      onResizeStop={(e, direction, ref, d) => {
                        this.handleResizeEvent(e, ref, selection.artwork, selection.gallery_wall_id)
                        }}
                    >
                        <ArtworkImage user_selection_id={selection.id} deleteArtwork={this.props.deleteArtwork} wallId={selection.gallery_wall_id}>
                        </ArtworkImage>
                    </Resizable>
                  </Draggable>
            )
        })
    }

    // renderCaptions = () => {
    //     return this.props.captions.map(caption => {
    //         return (
    //             <Draggable
    //             enableUserSelectHack={false}
    //             defaultPosition={{x: 0, y: 0}}>
    //             <Resizable
    //               defaultSize={{
    //                 width: 200,
    //                 height: 360
    //               }}
    //               style={{
    //                 position: 'absolute'
    //               }}
    //             >
    //             <div>
    //                 <Caption editCaption={this.props.editCaption} caption={caption} deleteCaption={this.props.deleteCaption} wallId={this.props.wallId} />
    //             </div>
    //           </Resizable>
    //           </Draggable>
    //         )
    //     })
    // }

    // renderTitles = () => {
    //     return this.props.titles.map(title => {
    //         return (
    //             <Draggable
    //             enableUserSelectHack={false}
    //             defaultPosition={{x: 0, y: 0}}>
    //             <Resizable
    //               defaultSize={{
    //                 width: 400,
    //                 height: 260
    //               }}
    //               style={{
    //                 position: 'absolute'
    //               }}
    //             >
    //             <div>
    //                 <Title editTitle={this.props.editTitle} title={title} deleteTitle={this.props.deleteTitle} wallId={this.props.wallId} />
    //             </div>
    //           </Resizable>
    //           </Draggable>
    //         )
    //     })
    // }

    render () {
        return (
            <div className="gallery-wall-container">
            {/* <button onClick={() => {
            }
            }>Save</button> */}
            {this.renderSelectedArtworks()}
            {/* {this.renderCaptions()}
            {this.renderTitles()} */}
          </div>
        )
    }
}
