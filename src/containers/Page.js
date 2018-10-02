import React, { Component } from 'react';
import uuid from 'uuid'
import './Page.css'
import ArtSelector from './ArtSelector';
import GalleryWall from './GalleryWall';
import Header from '../components/Header'

export default class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artworks: [],
            collectionNames: [],
            selectedCollections: [],
            displayedArtworks: [],
            displayedCollection: [],
            captions: [],
            titles: [],
            selectedArtworks: [],
            displayIndex: 0,
            prevButtonShown: false,
            nextButtonShown: true,
            artSelectorShown: true
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/artworks')
        .then(res => res.json())
        .then(data => this.setState({ artworks: data }))
        .then(() => {
            console.log(this.state)
            const collectionNames = this.state.artworks.map(artwork => artwork.collection).unique()
            this.setState({collectionNames: collectionNames, displayedCollection: this.state.artworks, displayedArtworks: this.state.artworks.slice(0,8)}, () => console.log(this.state))
        })
    }

    updateCollection = () => {
        let allCollectionsWorks = []
        for (let i=0; i<this.state.selectedCollections.length; i++) {
            let collectionWorks = this.state.artworks.filter(artwork => artwork.collection === this.state.selectedCollections[i])
            allCollectionsWorks = allCollectionsWorks.concat(collectionWorks)
            console.log(allCollectionsWorks)
            this.setState({displayedCollection: allCollectionsWorks, displayedArtworks: allCollectionsWorks.slice(0,8)}, () => console.log(this.state))
        }
    }

    filterByCollection = (collectionNameArray) => {
        this.setState({selectedCollections: collectionNameArray}, () => this.updateCollection())
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

    //add, edit, or delete text functions
    addCaption = () => {
        let captionObj = {id: uuid(), text: ""}
        this.setState({captions: [...this.state.captions, captionObj]}, () => console.log(this.state.captions))
    }

    editCaption = (captionText, captionId) => {
        const foundCaption = JSON.parse(JSON.stringify(this.state.captions.find(caption => caption.id === captionId)))
        const filteredCaptions = JSON.parse(JSON.stringify(this.state.captions.filter(caption => caption.id !== captionId)))
        foundCaption.text = captionText
        this.setState({captions: [...filteredCaptions, foundCaption]}, () => console.log(this.state.captions))
    }

    deleteCaption = (selectedCaption) => {
        const captionRemoved = JSON.parse(JSON.stringify(this.state.captions.filter(caption => caption !== selectedCaption)))
        this.setState({captions: captionRemoved})
    }

    //add, edit, or delete title text functions
    addTitle = () => {
        let titleObj = {id: uuid(), text: ""}
        this.setState({titles: [...this.state.titles, titleObj]})
    }

    editTitle = (titleText, titleId) => {
        const foundTitle = JSON.parse(JSON.stringify(this.state.titles.find(title => title.id === titleId)))
        const filteredTitles = JSON.parse(JSON.stringify(this.state.titles.filter(title => title.id !== titleId)))
        foundTitle.text = titleText
        this.setState({titles: [...filteredTitles, foundTitle]}, () => console.log(this.state.titles))
    }

    deleteTitle = (selectedTitle) => {
        const titleRemoved = JSON.parse(JSON.stringify(this.state.titles.filter(title => title !== selectedTitle)))
        this.setState({titles: titleRemoved})
    }


    renderArtSelector = () => {
        return this.state.artSelectorShown ? (
            <ArtSelector filterByCollection={this.filterByCollection} moreImages={this.moreImages} lessImages={this.lessImages} artworkProps={this.state} selectArtwork={this.selectArtwork}/>
        ) : null
    }

    toggleArtSelector = () => {
        this.state.artSelectorShown ? this.setState({artSelectorShown: false}) : this.setState({artSelectorShown: true})
    }

    deleteArtwork = (selectedArtwork) => {
        const artworkRemoved = JSON.parse(JSON.stringify(this.state.selectedArtworks.filter(artwork => artwork !== selectedArtwork)))
        this.setState({selectedArtworks: artworkRemoved})
    }

    render () {
        return (
            <div>
                <div class="top-bar-container">
                    <Header signin={this.props.signin} signout={this.props.signout} currentUser={this.props.currentUser} addCaption={this.addCaption} toggleArtSelector={this.toggleArtSelector} addTitle={this.addTitle}/>
                {this.renderArtSelector()}
                </div>
               <GalleryWall selectedArtworks={this.state.selectedArtworks} captions={this.state.captions} editCaption={this.editCaption} deleteCaption={this.deleteCaption} titles={this.state.titles} editTitle={this.editTitle} deleteTitle={this.deleteTitle} deleteArtwork={this.deleteArtwork} />
            </div>
        )
    }
}
