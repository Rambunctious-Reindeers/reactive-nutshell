/* author: James Chapman | purpose: This will create the cards that messageList uses to populate the message board */

import React, { Component } from 'react'
import "../Nutshell.css"

const getUserId = () => JSON.parse(localStorage.getItem("credentials")).userId

class MessageCard extends Component {

    
    render() {

        return (
            <div className="pa2 ma2">
                <div 
                    className="add-friend dib pointer hover-blue" 
                    onClick={() => {if(window.confirm('Do you want to add as a friend?')) this.props.addFriend(this.props.message.user.id)}}>
                    <h3 className="ttu f4 fw6">{this.props.message.user.username}:</h3>
                </div>
                <p className="pl2 dib">{this.props.message.message}</p>
                {getUserId() === this.props.message.userId 
                    ?
                        <div className="dib">
                            <div
                                className="pl2 f4 dib gray hover-orange pointer"
                                onClick={() => { this.props.history.push(`/messages/${this.props.message.id}/edit`) }}>
                                    &#x270E;
                            </div>
                            <div 
                                className="pl2 f4 dib pr3 gray dim pointer"
                                onClick={() => this.props.deleteMessage(this.props.message.id)}>
                                    &#x1F5D1;
                            </div>
                        </div>
                    : null
                }
            </div>
        )
    }
}

export default MessageCard;