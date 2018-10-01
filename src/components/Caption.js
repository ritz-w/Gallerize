import React, {Component} from 'react'
import { Form } from 'semantic-ui-react'
import CaptionCard from './CaptionCard'
import uuid from 'uuid'



export default class Caption extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: props.caption.text,
            isRendered: false
        }
    }

    renderCard = () => {
        this.setState({isRendered: true})
    }

    reeditCaption = () => {
        this.setState({isRendered: false})
    }

    handleClick = (event) => {
        this.props.editCaption(this.state.text, this.props.caption.id)
        this.renderCard()
    }

    handleChange = (event) => {
        this.setState({text: event.target.value})
    }

    render() {
        return (
            <div>
                {this.state.isRendered ? 
                    (
                        <CaptionCard text={this.state.text} reeditCaption={this.reeditCaption} deleteCaption={this.props.deleteCaption} caption={this.props.caption}/>
                    ) : (
                    <Form>
                        <Form.TextArea placeholder='Add your caption...' value={this.state.text} onChange={this.handleChange} />
                        <Form.Button onClick={this.handleClick}>Save</Form.Button>
                    </Form>
                    )
                }
            </div>
        )
    }
}

