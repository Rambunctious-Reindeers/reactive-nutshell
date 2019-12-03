import React, { Component } from 'react'
import "../Nutshell.css"



class FriendCard extends Component {


    render() {

        // const { name } = this.props.friend;

        return (
            <div className="card">
                <div className="card-content">
                    <h3><b>{this.props.friend.username}</b></h3>
                    <button type="button" onClick={() => this.props.deleteFriend(this.props.friend.id)}>Delete Friend</button>
                </div>
            </div>
        );
    }

}

export default FriendCard