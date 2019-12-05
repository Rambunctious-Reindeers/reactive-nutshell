/* author: James Chapman | this was pair coded with the rest of the group |  purpose: This will create the cards that eventList uses to populate the event board */
import React, { Component } from 'react'
import "../Nutshell.css"

export default class EventCard extends Component {
    render() {
        const { name, date, location, id, isMine, userId } = this.props.event;
        const { history, deleteEvent, isFirst } = this.props;

        const getUserId = () => JSON.parse(localStorage.getItem("credentials")).userId;

        const editButton = 
            <div
                className="f3 fr pb3 gray hover-orange pointer"
                alt="Edit event"
                onClick={() => { history.push(`/events/${id}/edit`) }}>
                    &#x270E;
           </div>;

        const deleteButton =
            <div className="ttu f7 fw6 fr pt3 grow pointer orange" onClick={() => deleteEvent(id)}>
                Delete event
            </div>;

        const cardContent =
            <div className="pa2 ma2">
                {getUserId() === userId ? editButton : null} 
                <p className="f7 fw6">{date}</p>
                <h3 className="ttu f4 fw6 dib">{name} <span className="dib f5 fw3"> at </span> {location}</h3>
                {getUserId() === userId ? deleteButton : null}     
            </div>;

        const cardContainer = isMine 
            ? isFirst 
                ? <div className="card-first pv1">{cardContent}</div> 
                : <div>{cardContent}<hr/></div>
            : isFirst 
                ? <div className="card-first other-users pv1">{cardContent}</div> 
                : <div className="other-users">{cardContent}<hr/></div>;

        return cardContainer;
    };
};