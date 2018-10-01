import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'
import './ArtworkCard.css'
import ArtworkCardDesc from './ArtworkCardDesc'


export default class ArtworkCard extends Component {
    state = {
        descriptionShown: false
    }

    showDescription = () => {
        this.setState({descriptionShown: true})
    }

    hideDescription = () => {
        this.setState({descriptionShown: false})
    }

    render() {
        return (
            <Card raised fluid onClick={() => this.props.selectArtwork(this.props.artwork)}>
                <div className="image" onMouseEnter={this.showDescription} onMouseOutCapture={this.hideDescription}>
                { 
                this.state.descriptionShown ? 
                <ArtworkCardDesc artwork={this.props.artwork}/>
                : <Image size='small' verticalAlign='middle' className="img-link" centered bordered src={this.props.artwork.image} />
                }

                </div>
            </Card>
        )
    }
    
}

