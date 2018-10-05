import React, { Component } from 'react';
import uuid from 'uuid'
import './Page.css'
import ArtSelector from './ArtSelector';
import Header from '../components/Header'
import GalleryWallContainer from './GalleryWallContainer'
import Fullscreen from "react-full-screen";
// import ThreeDViewer from './ThreeDViewer'


export default class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artworks: [],
            collectionNames: [],
            selectedCollections: [],
            displayedArtworks: [],
            displayedCollection: [],
            displayIndex: 0,
            prevButtonShown: false,
            nextButtonShown: true,
            artSelectorShown: true,
            isFull: false,
            currentWall: 1
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
    

    updateGalleries = () => {
        fetch(`http://localhost:3000/api/v1/users/${this.props.currentUserId}/galleries`)
        .then(res => res.json())
        .then(galleryData => this.props.setGalleriesState(galleryData), () => console.log(this.props.galleries))
    }


    getWidth = (url) => {
        let img = new Image();
        img.src = url;
        return img.width
    }

    getHeight = (url) => {
        let img = new Image();
        img.src = url;
        return img.height
    }

    selectArtwork = (artwork, wallId) => {
        fetch("http://localhost:3000/api/v1/add_artwork", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                artwork_id: artwork.id,
                user_email: this.props.currentUser,
                gallery_wall: parseInt(wallId-1),
                height: this.getHeight(artwork.image),
                width: this.getWidth(artwork.image)
        })
        }).then(res => res.json())
        .then(data => this.props.setGalleriesState(data))
    }

    deleteArtwork = (USId) => {
        fetch(`http://localhost:3000/api/v1/user_selections/${USId}`, {
            method: 'DELETE'
        }).then(res => res.json())
        .then(data => this.props.setGalleriesState(data))
    }

    // //user add, edit, or delete text functions
    addCaption = (wallId, isTitle) => {
        fetch("http://localhost:3000/api/v1/add_caption", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                gallery_wall_id: wallId,
                title: isTitle,
        })
        }).then(res => res.json())
        .then(data => this.props.setGalleriesState(data))
    }

    editCaption = (captionId, captionText) => {
        fetch(`http://localhost:3000/api/v1/captions/${captionId}/edit`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                text: captionText,
                rendered: true
        })
        }).then(res => res.json())
        .then(data => this.props.setGalleriesState(data))
    }

    deleteCaption = (captionId) => {
        fetch(`http://localhost:3000/api/v1/captions/${captionId}`, {
            method: 'DELETE'
        }).then(res => res.json())
        .then(data => this.props.setGalleriesState(data))
    }

    addTitle = (wallId) => {
        let titleObj = {id: uuid(), text: ""}
        const allWallTitles = {...this.state.titles}
        allWallTitles[wallId] = [...this.state.titles[wallId], titleObj]
        this.setState({titles: allWallTitles}, () => console.log(this.state.titles))
    }


    renderArtSelector = () => {
        return this.state.artSelectorShown ? (
            <ArtSelector 
            filterByCollection={this.filterByCollection} 
            moreImages={this.moreImages} 
            lessImages={this.lessImages} 
            artworkProps={this.state} 
            selectArtwork={this.selectArtwork}
            currentWall={this.state.currentWall}
            />
        ) : null
    }

    toggleArtSelector = () => {
        this.state.artSelectorShown ? this.setState({artSelectorShown: false}) : this.setState({artSelectorShown: true})
    }

    enableFullScreen = () => {
        this.setState({isFull: true})
    }

    handleWallChange = (changedWall) => {
        this.setState({currentWall: changedWall}, () => {
            console.log(this.state.currentWall)
            this.updateGalleries()
        })
    
    }

    renderGalleries = () => {
        return this.props.currentUser ? 
            (<Fullscreen
                enabled={this.state.isFull}
                onChange={isFull => this.setState({isFull})}
                >
                <GalleryWallContainer 
                currentUserId={this.props.currentUserId}
                galleries={this.props.galleries} 
                // captions={this.state.captions} 
                editCaption={this.editCaption} 
                deleteCaption={this.deleteCaption} 
                // titles={this.state.titles} 
                // editTitle={this.editTitle} 
                // deleteTitle={this.deleteTitle} 
                deleteArtwork={this.deleteArtwork} 
                handleWallChange={this.handleWallChange}
                currentWall={this.state.currentWall}
                setGalleriesState={this.props.setGalleriesState}
                />
            </Fullscreen>)
                : 
            (<div>Please Sign In!</div>) 
    }



    render () {
        return (
            <div>
                <div class="top-bar-container">
                    <Header 
                    signin={this.props.signin} 
                    signout={this.props.signout} 
                    currentUser={this.props.currentUser} 
                    addCaption={this.addCaption} 
                    toggleArtSelector={this.toggleArtSelector} 
                    enableFullScreen={this.enableFullScreen} 
                    addTitle={this.addTitle}
                    currentWall={this.state.currentWall}
                    galleries={this.props.galleries} 
                    />
                {this.renderArtSelector()}
                </div>
                { this.renderGalleries() }
            </div>
        )
    }
}
