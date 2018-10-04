import React, { Component } from 'react';
import { Grid, Icon } from 'semantic-ui-react'
import CollectionMenu from '../components/CollectionMenu'
import ArtworkCard from '../components/ArtworkCard'
import './ArtSelector.css'

export default class ArtSelector extends Component {

    renderMenu = () => {
        return <CollectionMenu filterByCollection={this.props.filterByCollection} collectionNames={this.props.artworkProps.collectionNames} />
    }

    renderCards = () => {
        return this.props.artworkProps.displayedArtworks.map(artwork => {
            return (
                <Grid.Column width={2}>
                    <ArtworkCard currentWall={this.props.currentWall} artwork={artwork} selectArtwork={this.props.selectArtwork}/>
                </Grid.Column>
    
            )
        })
    }

    renderNextButton = () => {
        return this.props.artworkProps.nextButtonShown ? <Icon name='caret square right outline' size='big' aria-label="More Images" onClick={this.props.moreImages}/> : null
    }

    renderPrevButton = () => {
        return this.props.artworkProps.prevButtonShown ? <Icon name='caret square left outline' size='big' aria-label="Less Images" onClick={this.props.lessImages} /> : null
    }

    // moreImages = () => {
    //     const currentIndex = this.state.displayIndex + 8 > this.state.displayedCollection.length ? 0 : this.state.displayIndex + 8
    //     this.state.displayIndex + 8 === this.state.displayedCollection.length ? (
    //         this.setState({nextButtonShown: false})
    //     ) : (
    //         this.setState({displayIndex: currentIndex, displayedArtworks: this.state.displayedCollection.slice(currentIndex, currentIndex+8,), prevButtonShown: true}, () => console.log(this.state))
    //     )
    // }

    // lessImages = () => {
    //     const currentIndex = this.state.displayIndex - 8 > 0 ? this.state.displayIndex - 8 : 0
    //     this.state.displayIndex - 8 <= 8 ? (
    //         this.setState({prevButtonShown: false}, () => console.log(this.state.prevButtonShown)) 
    //     ) : (
    //         this.setState({displayIndex: currentIndex, displayedArtworks: this.state.displayedCollection.slice(currentIndex, currentIndex+8), prevButtonShown: true}, () => console.log(this.state.displayIndex))
    //     )
    // }

    render () {
        return (
                    <div className="art-selector-container">
                        {this.renderMenu()}
                    <Grid columns={3}>
                        <Grid.Column width={1}  className="arrow-button">
                            {this.renderPrevButton()}
                        </Grid.Column>
                        <Grid.Column width={14}>
                            <Grid columns={8} className="cards centered card-row">
                                {this.renderCards()}
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={1} className="arrow-button">
                            { this.renderNextButton() }
                        </Grid.Column>
                    </Grid>
                    </div>
        )
    }
}


Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
      if(!arr.includes(this[i])) {
          arr.push(this[i]);
      }
    }
    return arr;
  }