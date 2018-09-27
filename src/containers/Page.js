import React, { Component } from 'react';
import ArtSelector from './ArtSelector';
import GalleryWall from './GalleryWall';

export default class Page extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
               <ArtSelector /> 
               <GalleryWall />
            </div>
        )
    }
}