/* author: James Chapman | purpose: This will create the cards that messageList uses to populate the message board */

import React, { Component } from 'react'
import "../Nutshell.css"



class MessageCard extends Component {


    render() {

        return (
            <div className="pv1">
                <div className="add-friend" onClick={() => {if(window.confirm('Do you want to add as a friend?')) this.props.addFriend(this.props.message.user.id)}}>
                <h3>Name: <b>{this.props.message.user.username}</b></h3>
                </div>
                <p>Message: {this.props.message.message}</p>

                <button type="button"
                    onClick={() => { this.props.history.push(`/messages/${this.props.message.id}/edit`) }}>Edit</button>
                <button type="button" onClick={() => this.props.deleteMessage(this.props.message.id)}>Delete</button>
            </div>
        )
    }
}

export default MessageCard