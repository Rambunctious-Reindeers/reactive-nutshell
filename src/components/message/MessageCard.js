import React, { Component } from 'react'
import "../Nutshell.css"



class MessageCard extends Component {


    render() {

        return (
            <div className="card-content">
                <h3>Name: <b>{this.props.message.user.username}</b></h3>
                <p>Message: {this.props.message.message}</p>

                <button type="button"
                    onClick={() => { this.props.history.push(`/messages/${this.props.message.id}/edit`) }}>Edit</button>
                <button type="button" onClick={() => this.props.deleteMessage(this.props.message.id)}>Delete</button>
            </div>
        )
    }
}

export default MessageCard