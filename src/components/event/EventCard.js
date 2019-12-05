/* author: James Chapman | this was pair coded with the rest of the group |  purpose: This will create the cards that eventList uses to populate the event board */

import React, { Component } from 'react'
import "../Nutshell.css"



class EventCard extends Component {

    getUserId = () => JSON.parse(localStorage.getItem("credentials")).userId
    render() {

        const { name, date, location } = this.props.event;

        const cardContent =
            <div className="card-content">
                <h3>Name: <b>{name}</b></h3>
                <p>Date: {date}</p>
                <p>location: {location}</p>

                {this.getUserId() === this.props.event.userId ?
                <>
                <button type="button"
                onClick={() => { this.props.history.push(`/events/${this.props.event.id}/edit`) }}>Edit</button>
            <button type="button" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</button>
            </>
            : null
            }
                

            </div>

        const cardContainer =
            this.props.event.isMine ?
                this.props.isFirst ?
                    <div className="card-first">{cardContent}</div> : <div className="card">{cardContent}</div>
                :
                this.props.isFirst ?
                    <div className="card-first other-users">{cardContent}</div> : <div className="card other-users">{cardContent}</div>


        return cardContainer;
    }
}

export default EventCard