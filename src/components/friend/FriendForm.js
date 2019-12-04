import React, { Component } from 'react'
import APIManager from '../module/APIManager'

class FriendForm extends Component {

    state = {
        friendName: "",
        loadingStatus: false
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    addNewFriend = evt => {
        // console.log(evt)
        evt.preventDefault();

        let potentialFriendId
        let loggedInUserId = JSON.parse(localStorage.getItem("credentials")).userId


        APIManager.getAll(`users?username=${this.state.friendName}`)
            .then(response => {
                if (response.length === 0) {
                    window.alert("Please enter correct username")
                } else {
                    potentialFriendId = parseInt(response[0].id)
                    APIManager.getAll(`friends?loggedInUserId=${loggedInUserId}&_expand=user`)
                    .then(r => {
                        const comparePotentialFriendToUsername = r.filter(r => (r.user.username===this.state.friendName))
                        if (potentialFriendId===loggedInUserId) {
                            window.alert("You cannot friend yourself")
                        }  else if  (comparePotentialFriendToUsername.length > 0) {
                            window.alert(`You are already friends with ${this.state.friendName}`)
                        } else {
                            const friendObject = {
                                loggedInUserId: loggedInUserId,
                                userId: potentialFriendId
                        }
                        APIManager.post("friends", friendObject)
                        .then(() => {
                        this.props.history.push("/friends")
                        
                    })

                    }})
                }
            }
            )
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
                                id="friendName"
                                value={this.state.friendName}
                            />
                            <label htmlFor="friendName">Name</label>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.addNewFriend}
                            >Add Friend</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }

}

export default FriendForm