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
                    let d1 = new Date(a.timestamp), d2 = new Date(b.timestamp)
                    return d1 - d2
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

      
    addFriend = id => {
        // console.log(id)
        // evt.preventDefault();

        let potentialFriendId = id
        let loggedInUserId = JSON.parse(localStorage.getItem("credentials")).userId


        APIManager.getAll(`users?id=${id}`)
            .then(response => {
                if (response.length === 0) {
                    window.alert("Please enter correct username")
                } else {
                    potentialFriendId = parseInt(response[0].id)
                    APIManager.getAll(`friends?loggedInUserId=${loggedInUserId}&_expand=user`)
                    .then(r => {
                        const comparePotentialFriendToUsername = r.filter(r => (r.user.id===id))
                        if (potentialFriendId===loggedInUserId) {
                            window.alert("You cannot friend yourself")
                        }  else if  (comparePotentialFriendToUsername.length > 0) {
                            window.alert(`You are already friends with this person!`)
                        } else {
                            const friendObject = {
                                loggedInUserId: loggedInUserId,
                                userId: potentialFriendId
                        }
                        APIManager.post("friends", friendObject)
                        .then(() => {
                        this.props.history.push("/messages")
                        
                    })

                    }})
                }
            }
            )
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
                            addFriend={this.addFriend}
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