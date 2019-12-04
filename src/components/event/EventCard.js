import React, { Component } from 'react';
import "../Nutshell.css";

export default class EventCard extends Component {
    render() {
        const { name, date, location, id } = this.props.event;
        const { history, deleteEvent, isFirst } = this.props;

        const cardContent =
            <div className="pa3 ma3">
                <div
                    className="f3 fl pr3 pb4 gray hover-orange pointer" 
                    alt="Edit event"
                    onClick={() => { history.push(`/events/${id}/edit`) }}>
                        &#x270E;
                </div>
                <p className="f7 fw6">{date}</p>
                <h3 className="ttu f4 fw6 dib">{name} <span className="dib f5 fw5"> at </span> {location}</h3>
                <button type="button" onClick={() => deleteEvent(id)}>Delete</button>
            </div>;

        const cardContainer = isFirst 
            ? <div className="card-first pv1">{cardContent}</div> 
            : <div className="pv1">{cardContent}</div>;

        return cardContainer;
    }
};