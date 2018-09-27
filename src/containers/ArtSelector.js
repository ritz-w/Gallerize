import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react'
import CollectionMenu from '../components/CollectionMenu'

export default class ArtSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artworks: [],
            collectionNames: [],
            displayedArtworks: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/artworks')
        .then(res => res.json())
        .then(data => this.setState({ artworks: data }))
        .then(() => {
            const collectionNames = this.state.artworks.map(artwork => artwork.collection).unique()
            this.setState({collectionNames: collectionNames}, () => console.log(this.state))
        })
    }

    filterByCollection = (collectionName) => {
        this.state.artworks.filter(artwork => artwork.collection === collectionName)
    }

    renderMenu = () => {
        return <CollectionMenu collectionNames={this.state.collectionNames}/>
    }

    render () {
        return (
            <div>
                {this.renderMenu()}
                <Grid>
                    <Grid.Column width={4}>
                    <Image src='/images/wireframe/image.png' />
                    </Grid.Column>
                    <Grid.Column width={4}>
                    <Image src='/images/wireframe/paragraph.png' />
                    </Grid.Column>
                    <Grid.Column width={4}>
                    <Image src='/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                    <Grid.Column width={4}>
                    <Image src='/images/wireframe/media-paragraph.png' />
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