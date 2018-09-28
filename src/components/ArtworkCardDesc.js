import React from 'react'
import { Card } from 'semantic-ui-react'


const ArtworkCardDesc = (props) => {
    return (
        <Card.Description className="card-text">
        <div>
        "{props.artwork.title}"
        <br />
        ({props.artwork.artist})

        </div>
        </Card.Description>
    )
}

export default ArtworkCardDesc