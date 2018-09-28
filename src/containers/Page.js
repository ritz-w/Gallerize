import React, { Component } from 'react';
import ArtSelector from './ArtSelector';
import GalleryWall from './GalleryWall';

export default class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artworks: [],
            collectionNames: [],
            selectedCollections: [],
            displayedArtworks: [],
            displayedCollection: [],
            selectedArtworks: [],
            displayIndex: 0
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/artworks')
        .then(res => res.json())
        .then(data => this.setState({ artworks: data }))
        .then(() => {
            const collectionNames = this.state.artworks.map(artwork => artwork.collection).unique()
            this.setState({collectionNames: collectionNames, displayedCollection: this.state.artworks, displayedArtworks: this.state.artworks.slice(0,8)}, () => console.log(this.state))
        })
    }

    filterByCollection = (collectionNameArray) => {
        this.setState({selectedCollections: collectionNameArray})
        let allCollectionsWorks = []
        for (let i=0; i<this.state.selectedCollections.length; i++) {
            let collectionWorks = this.state.artworks.filter(artwork => artwork.collection === this.state.selectedCollections[i])
            allCollectionsWorks = allCollectionsWorks.concat(collectionWorks)
            this.setState({displayedCollection: allCollectionsWorks, displayedArtworks: allCollectionsWorks.slice(0,8)}, () => console.log(this.state))
        }
    }

    moreImages = () => {
        const currentIndex = this.state.displayIndex + 8 > this.state.displayedCollection.length ? 0 : this.state.displayIndex + 8
        this.state.displayIndex + 8 === this.state.displayedCollection.length ? (
            this.setState({nextButtonShown: false})
        ) : (
            this.setState({displayIndex: currentIndex, displayedArtworks: this.state.displayedCollection.slice(currentIndex, currentIndex+8,), prevButtonShown: true}, () => console.log(this.state))
        )
    }

    lessImages = () => {
        const currentIndex = this.state.displayIndex - 8 > 0 ? this.state.displayIndex - 8 : 0
        this.state.displayIndex - 8 <= 8 ? (
            this.setState({prevButtonShown: false}, () => console.log(this.state.prevButtonShown)) 
        ) : (
            this.setState({displayIndex: currentIndex, displayedArtworks: this.state.displayedCollection.slice(currentIndex, currentIndex+8), prevButtonShown: true}, () => console.log(this.state.displayIndex))
        )
    }

    selectArtwork = (artwork) => {
        this.setState({selectedArtworks: [...this.state.selectedArtworks, artwork]})
    }

    render () {
        return (
            <div>
               <ArtSelector filterByCollection={this.filterByCollection} moreImages={this.moreImages} lessImages={this.lessImages} artworkProps={this.state} selectArtwork={this.selectArtwork}/> 
               <GalleryWall selectedArtworks={this.state.selectedArtworks} />
            </div>
        )
    }
}