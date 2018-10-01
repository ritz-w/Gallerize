import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'



export default class TitleCard extends Component {
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
                <Button onClick={() => this.props.deleteTitle(this.props.title)}>Delete</Button>
                <Button.Or />
                <Button positive onClick={this.props.reeditTitle}>Edit</Button>
            </Button.Group>
        ) : null 
    }


    render() {
        return (
            <div onMouseEnter={this.showEditButton} onMouseLeave={this.hideEditButton}>
                <h1>{this.props.text}</h1>
                { this.renderEditButton()}

            </div> 
         )
    }
}

