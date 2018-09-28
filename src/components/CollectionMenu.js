import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'



export default class CollectionMenu extends Component {

    createCollectionOptions = (collectionNames) => {
        return collectionNames.map(name => ({key: name, value: name, text: name})) 
    }

    render() {
        return (
            <Dropdown placeholder='Select Collection' onChange={(event, data) => this.props.filterByCollection(data.value)} fluid multiple search selection options={this.createCollectionOptions(this.props.collectionNames)} className="combo-box" />
        )
    }

}


