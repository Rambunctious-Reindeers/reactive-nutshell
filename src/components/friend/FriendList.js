// Author: Adam Byrd
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
              <div 
                className="dim pointer ma3 ph4 blue" 
                onClick={() => { this.props.history.push("/friends/new")}}>
                  Add Friend
              </div>
              <hr/>
              <div className="ma3 ph3">
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