/* authors: James Chapman, Sullivan Pierce | this was pair coded with the rest of the group | purpose: this card builds the main page for events */


import React, { Component } from 'react'
import APIManager from '../module/APIManager'
import EventCard from './EventCard'


class EventList extends Component {

    state = {
        events: [],
    }

    getEvents = () => {
        this.props.buildFriendsList()
            .then((friendsList) => {

                APIManager.getAll("events")
                    .then((events) => {
                        friendsList.push(this.props.getUserId())
                        const unlabeledEvents = events.filter((event) => friendsList.includes(event.userId))
                        const yourEventList = unlabeledEvents.map((event) => {
                            const newEvent = event
                            newEvent.isMine=(event.userId === this.props.getUserId())
                            return event
                        })
                        const sortedEvents = yourEventList.sort(function (a, b) {
                            let dateA = new Date(a.date), dateB = new Date(b.date)
                            return dateA - dateB
                        })
                        this.setState({
                            events: sortedEvents
                        })
                    })
            })
    }

    componentDidMount() {
        this.getEvents()
    }

    deleteEvent = id => {
        APIManager.delete("events", id)
            .then(() => {
                this.getEvents()
            })
    }

    render() {

        return (
            <>
                <div
                    className="dim pointer ma3 ph4 blue"
                    onClick={() => { this.props.history.push("/events/new") }}>
                        Create New Event
                </div>
                <div className="ma3 ph4 w-60">
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