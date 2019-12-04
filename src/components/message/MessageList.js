/* author: James Chapman | purpose: this card builds the main page for messages */

import React, { Component } from 'react'
import APIManager from '../module/APIManager'
import MessageCard from './MessageCard'


class MessageList extends Component {

    state = {
        messages: [],
    }

    componentDidMount() {
        APIManager.getMessages()
            .then((messages) => {
                const sortMessages = messages.sort(function (a, b) {
                    let dateA = new Date(a.date), dateB = new Date(b.date)
                    return dateA - dateB
                })
                this.setState({
                    messages: sortMessages
                })
            })
    }

    deleteMessage = id => {
        APIManager.delete("messages", id)
          .then(() => {
            APIManager.getMessages()
              .then((newMessages) => {
                this.setState({
                  messages: newMessages
                })
              })
          })
      }

    render() {

        return (
            <>
                <section className="section-content">
                    <button
                        type="button"
                        className="btn"
                        onClick={() => { this.props.history.push("/messages/new") }}>
                        Add Message
                    </button>
                </section>
                <div className="container-cards">
                    {this.state.messages.map(message =>
                        <MessageCard
                            key={message.id}
                            message={message}
                            deleteMessage={this.deleteMessage}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }

}

export default MessageList