import React, { Component } from 'react'
import "../Nutshell.css"



class EventCard extends Component {


    render() {

        const { name, date, location } = this.props.event;

        const cardContent =
            <div className="card-content">
                <h3>Name: <b>{name}</b></h3>
                <p>Date: {date}</p>
                <p>location: {location}</p>

                <button type="button"
                    onClick={() => { this.props.history.push(`/events/${this.props.event.id}/edit`) }}>Edit</button>
                <button type="button" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</button>
            </div>

        const cardContainer = this.props.isFirst ?
            <div className="card-first">{cardContent}</div> : <div className="card">{cardContent}</div>


        return cardContainer;
    }
}

export default EventCard