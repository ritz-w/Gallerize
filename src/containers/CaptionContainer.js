import React, {Component} from 'react'
import {Rnd} from 'react-rnd';
import Caption from '../components/Caption'

export default class CaptionContainer extends Component {

    handleCaptionDrag = (data, caption_id) => {
        fetch("https://gallerize-api.herokuapp.com/api/v1/move_caption", {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                caption_id: caption_id,
                x: data.x,
                y: data.y
            })
        }).then(res => res.json())
        .then(data => this.props.setGalleriesState(data))

    }


    handleCaptionResize = (ref, caption_id) => {
        fetch("https://gallerize-api.herokuapp.com/api/v1/resize_caption", {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                caption_id: caption_id,
                width: ref.offsetWidth,
                height: ref.offsetHeight,
            })
        }).then(res => res.json())
        .then(data => this.props.setGalleriesState(data))
    }


    render() {
        const {caption} = this.props
        return (

            <Rnd
            key={caption.id}
            id={caption.id}
            ref={c => { this.rnd = c; }}
            enableUserSelectHack={false} 
            default={{
                x: caption.x_position,
                y: caption.y_position,
                width: caption.width,
                height: caption.height,
            }}
            lockAspectRatio={false}
            
            onResizeStop={
                (e, dir, refToElement, delta, position) => this.handleCaptionResize(refToElement, caption.id)
            }
            onDragStop={
                (e, data) => this.handleCaptionDrag(data, caption.id)
            }
        >
            <div>
                <Caption 
                caption={caption}
                editCaption={this.props.editCaption} 
                setGalleriesState={this.props.setGalleriesState}
                deleteCaption={this.props.deleteCaption}
                />
            </div>
        </Rnd>
        )
    }
}