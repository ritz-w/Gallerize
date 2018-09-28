import React, { Component } from 'react';
import './GalleryWall.css';
import Draggable from 'react-draggable';
// import { Resizable, ResizableBox } from 'react-resizable';
import Resizable from 're-resizable'



export default class GalleryWall extends Component {

    renderSelectedArtworks = () => {
        return this.props.selectedArtworks.map(artwork => {
            return (
                <Draggable
                    axis="both"
                    handle=".handle"
                    defaultPosition={{x: 0, y: 0}}
                    position={null}
                    grid={[25, 25]}
                    onStart={this.handleStart}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}>
                        {/* <Resizable width={200} height={200} draggableOptions={{ disabled: true }}
                            minConstraints={[100, 100]} maxConstraints={[300, 300]}>
                        <div style={{width: '200px'}}>
                            <img className="handle" style={{width: '100%'}} src={artwork.image} />
                        </div>
                        </Resizable> */}
                        <Resizable
                            defaultSize={{
                            width: 200,
                            height: 200,
                            }}
                        >
                            <div style={{width: '100%', height: '100%', background: `url(${artwork.image})`, backgroundSize: 'cover'}} />                            
                        </Resizable>
                </Draggable> 
            )
        })
    }

    render () {
        return (
            <div className="gallery-wall-container">
            {this.renderSelectedArtworks()}
          </div>
        )
    }
}