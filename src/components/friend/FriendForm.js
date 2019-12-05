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
                <form className="ph5 pt4 pb5 mt5 ml4 br3 shadow-1 w-40">
                    <fieldset>
                        <label htmlFor="friendName">Name</label>
                        <input
                            className="w-100"
                            type="text"
                            required
                            onChange={this.handleFieldChange}
                            id="friendName"
                            placeholder="Your friend's name"
                            value={this.state.friendName}
                        />
                    </fieldset>
                    <button
                        className="f6 fw5 bg-white orange hover-blue link pointer pa2 pv1 mt2 mb3 mr3 fr br2"
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.addNewFriend}
                    >Add Friend</button>
                </form>
            </>
        )
    }

}

export default FriendForm