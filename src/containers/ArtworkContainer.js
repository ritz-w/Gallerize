import React, {Component} from 'react'
import {Rnd} from 'react-rnd';
import ArtworkImage from '../components/ArtworkImage'

export default class ArtworkContainer extends Component {

    handleDragEvent = (data, artwork, user_selection_id) => {
        fetch("http://localhost:3000/api/v1/move_artwork", {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: this.props.user_id,
                user_selection_id: user_selection_id,
                position_x: data.x,
                position_y: data.y
            })
        }).then(res => res.json())
        .then(data => this.props.setGalleriesState(data))

    }


    handleResizeEvent = (e, ref, artwork, user_selection_id) => {
        fetch("http://localhost:3000/api/v1/resize_artwork", {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                user_id: this.props.user_id,
                user_selection_id: user_selection_id,
                width: ref.offsetWidth,
                height: ref.offsetHeight,
            })
        }).then(res => res.json())
        .then(data => this.props.setGalleriesState(data))

    }


    render() {
        const {selection} = this.props
        return (

            <Rnd
            key={selection.id}
            id={selection.id}
            ref={c => { this.rnd = c; }} 
            default={{
                x: selection.x_position,
                y: selection.y_position,
                width: selection.width,
                height: selection.height,
            }}
            lockAspectRatio={true}
            
            onResizeStop={
                (e, dir, refToElement, delta, position) => this.handleResizeEvent(e, refToElement, selection.artwork, selection.id)
            }
            onDragStop={
                (e, data) => this.handleDragEvent(data, selection.artwork, selection.id)
            }
        >
        <ArtworkImage deleteArtwork={this.props.deleteArtwork} selection={this.props.selection}/>
        </Rnd>
        )
    }
}