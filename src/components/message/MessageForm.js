import React, { Component } from 'react'
import APIManager from '../module/APIManager';

class MessageForm extends Component {

    state = {
        userName: localStorage.getItem("credentials", 1),
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
        if (this.state.userName === "" || this.state.messages === "") {
            window.alert("Please enter a name and a message!")
        } else {
            this.setState({ loadingStatus: true });
            const message = {
                name: this.state.userName,
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
            Username: this.state.userName,
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
                userName: message.name,
                message: message.date,
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
                                id="userName"
                                value= {this.state.userName}
                            />
                            <label htmlFor="userName">Name</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="message"
                                placeholder="Message"
                                value= {this.state.message}
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