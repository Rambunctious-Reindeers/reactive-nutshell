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
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="message"
                                placeholder="Message"
                                value={this.state.message}
                            />
                            <label htmlFor="date">message</label>
                            
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick=
                                {this.props.isNew ? this.constructNewMessage : this.updateExistingMessage}
                            >Submit</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default MessageForm