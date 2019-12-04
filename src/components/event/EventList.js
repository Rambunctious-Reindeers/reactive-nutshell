/* author: James Chapman | this was pair coded with the rest of the group | purpose: this card builds the main page for events */


import React, { Component } from 'react'
import APIManager from '../module/APIManager'
import EventCard from './EventCard'


class EventList extends Component {

    state = {
        events: [],
    }

    componentDidMount() {
        this.props.buildFriendsList()
            .then((friendsList) => {

                APIManager.getAll("events")
                    .then((events) => {
                        const yourEvents = events.filter((event) => friendsList.includes(event.userId))
                        const sortEvents = yourEvents.sort(function (a, b) {
                            let dateA = new Date(a.date), dateB = new Date(b.date)
                            return dateA - dateB
                        })
                        this.setState({
                            events: sortEvents
                        })
                    })
            })
    }

    deleteEvent = id => {
        APIManager.delete("events", id)
            .then(() => {
                APIManager.getAll("events")
                    .then((newEvents) => {
                        this.setState({
                            events: newEvents
                        })
                    })
            })
    }

    render() {

        return (
            <>
                <section className="section-content">
                    <button
                        type="button"
                        className="btn"
                        onClick={() => { this.props.history.push("/events/new") }}>
                        Add Event
                    </button>
                </section>
                <div className="container-cards">
                    {this.state.events.map((event, index) =>
                        <EventCard
                            key={event.id}
                            event={event}
                            isFirst={index === 0}
                            deleteEvent={this.deleteEvent}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }

}

export default EventList