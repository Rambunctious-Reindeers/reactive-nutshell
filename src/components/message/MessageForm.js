/* author: James Chapman | purpose: this is the page that will populate the new message and edit message forms */

import React, { Component } from 'react'
import APIManager from '../module/APIManager';

class MessageForm extends Component {

    state = {
        userId: JSON.parse(localStorage.getItem("credentials")).userId,
        message: "",
        timestamp: "",
        loadingStatus: false,
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    constructNewMessage = evt => {
        evt.preventDefault();
        if (this.state.messages === "") {
            window.alert("Please enter a message!")
        } else {
            this.setState({ loadingStatus: true });
            const userId = JSON.parse(localStorage.getItem("credentials")).userId
            const message = {
                userId: Number(userId),
                message: this.state.message,
                timestamp: Date.now()
            }

            APIManager.post("messages", message)
                .then(() => this.props.history.push("/messages"))
        }
    }

    updateExistingMessage = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedMessage = {
            id: this.props.match.params.messageId,
            userId: JSON.parse(localStorage.getItem("credentials")).userId,
            message: this.state.message,
            timestamp: Date.now(),
        };

        APIManager.put("messages", this.props.match.params.messageId, editedMessage)
            .then(() => this.props.history.push("/messages"))
    };

    componentDidMount(){
        if(!this.props.isNew){
            APIManager.get("messages", this.props.match.params.messageId)
            .then(message => {
              this.setState({
                message: message.message,
                loadingStatus: false,
              });
            });
        }
    }

    render() {
        return (
            <>
                <form className="ph5 pt4 pb5 mt5 ml4 br3 shadow-1 w-40">
                    <fieldset>
                        <label htmlFor="date" className="f6 b db mb2">Message</label>
                        <input
                            className="w-100"
                            type="text"
                            required
                            onChange={this.handleFieldChange}
                            id="message"
                            placeholder="Your message"
                            value={this.state.message}
                        />
                    </fieldset>
                    <button
                        className="f6 fw5 bg-white orange hover-blue link pointer pa2 pv1 mt2 mb3 mr3 fr br2"
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick=
                        {this.props.isNew ? this.constructNewMessage : this.updateExistingMessage}
                    >Submit</button>
                </form>
            </>
        )
    }
}

export default MessageForm