import React, { Component } from 'react'
import "../Nutshell.css"



class FriendCard extends Component {


    render() {

        // const { name } = this.props.friend;

        return (
            <div className="pa2 ma2">
                <div className="card-content">
                    <h3 className="dib f5 fw1">{this.props.friend.user.username} |</h3>
                    <div 
                        className="pl1 dib ttu f7 fw6 grow pointer orange" 
                        onClick={() => this.props.deleteFriend(this.props.friend.id)}>
                            Delete Friend
                    </div>
                </div>
            </div>
        );
    }

}

export default FriendCard