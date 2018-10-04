import React, {Component} from 'react'
import { Form } from 'semantic-ui-react'
import TitleCard from './TitleCard'
import uuid from 'uuid'



export default class Title extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: props.title.text,
            isRendered: false
        }
    }

    renderTitleCard = () => {
        this.setState({isRendered: true})
    }

    reeditTitle = () => {
        this.setState({isRendered: false})
    }

    handleTitleClick = (event) => {
        this.props.editTitle(this.state.text, this.props.title.id, this.props.wallId)
        this.renderTitleCard()
    }

    handleTitleChange = (event) => {
        this.setState({text: event.target.value})
    }

    render() {
        return (
            <div>
                {this.state.isRendered ? 
                    (
                        <TitleCard text={this.state.text} reeditTitle={this.reeditTitle} deleteTitle={this.props.deleteTitle} title={this.props.title} wallId={this.props.wallId}/>
                    ) : (
                    <Form>
                        <Form.TextArea placeholder='Add your title...' value={this.state.text} onChange={this.handleTitleChange} />
                        <Form.Button onClick={this.handleTitleClick}>Save</Form.Button>
                    </Form>
                    )
                }
            </div>
        )
    }
}

