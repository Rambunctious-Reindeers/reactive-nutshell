import React, { Component } from 'react';
import "../Nutshell.css";

class EventCard extends Component {
    render() {

        const { name, date, location } = this.props.event;

        const cardContent =
            <div className="card-content pa3 ma3">
                <div
                    className="f3 fl pr3 pb4 gray hover-orange pointer" 
                    alt="Edit event"
                    onClick={() => { this.props.history.push(`/events/${this.props.event.id}/edit`) }}>
                        &#x270E;
                </div>
                <p className="f7 fw6">{date}</p>
                <h3 className="ttu f4 fw6 dib">{name} <span className="dib f5 fw5"> at {location}</span></h3>
                <button type="button" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</button>
            </div>

        const cardContainer = this.props.isFirst ?
            <div className="card-first pv1">{cardContent}</div> : <div className="card pv1">{cardContent}</div>


        return cardContainer;
    }
}

export default EventCard