import React, { Component } from 'react'
import APIManager from '../module/APIManager'
import FriendCard from './FriendCard'

let loggedInUserId = JSON.parse(localStorage.getItem("credentials")).userId

class FriendList extends Component {

    state = {
        friends: []
    }

    componentDidMount() {
        APIManager.getAll(`friends?loggedInUserId=${loggedInUserId}&_expand=user`)
          .then((friends) => {
            this.setState({
              friends: friends
            })
          })
      }

      deleteFriend = id => {
        APIManager.delete("friends", id)
          .then(() => {
            APIManager.getAll(`friends?loggedInUserId=${loggedInUserId}&_expand=user`)
              .then((newFriends) => {
                this.setState({
                  friends: newFriends
                })
              })
          })
      }

    render () {

        return (
            <>
            <section className="section-content">
                <button type="button" className="btn" onClick={() => { this.props.history.push("/friends/new")}}>Add Friend</button>
            </section>
            <div className="container-cards">
                {this.state.friends.map((friend) => 
                <FriendCard 
                    key={friend.id}
                    friend={friend}
                    deleteFriend={this.deleteFriend}
                    {...this.props}
                    />
                )}
            </div>
            </>
        )
    }  

}

export default FriendList