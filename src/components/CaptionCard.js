import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'



export default class CaptionCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            editButtonOn: false
        }
    }
    showEditButton = (event) => {
        this.setState({editButtonOn: true})
    }

    hideEditButton = (event) => {
        this.setState({editButtonOn: false})

    }

    renderEditButton = () => {
        return this.state.editButtonOn ? (
            <Button.Group>
                <Button onClick={() => this.props.deleteCaption(this.props.caption, this.props.wallId)}>Delete</Button>
                <Button.Or />
                <Button positive onClick={this.props.reeditCaption}>Edit</Button>
            </Button.Group>
        ) : null 
    }


    render() {
        return (
            <div onMouseEnter={this.showEditButton} onMouseLeave={this.hideEditButton}>
                <p>{this.props.text}</p>
                { this.renderEditButton()}

            </div> 
         )
    }
}

