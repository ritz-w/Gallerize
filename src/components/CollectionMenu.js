import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'


const CollectionMenu = (props) => {
    
    const createCollectionOptions = (collectionNames) => {
        return collectionNames.map(name => ({key: name, value: name, text: name})) 
    }
    // countryOptions = [ { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }, ...  ]

    return (
        <Dropdown placeholder='Select Collection' fluid multiple search selection options={createCollectionOptions(props.collectionNames)} />
    )
}


export default CollectionMenu