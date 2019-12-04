import React, { Component } from 'react'
import APIManager from '../module/APIManager'
import EventCard from './EventCard'


class EventList extends Component {

    state = {
        events: [],
    }

    componentDidMount() {
        APIManager.getAll("events")
            .then((events) => {
                const sortEvents = events.sort(function (a, b) {
                    let dateA = new Date(a.date), dateB = new Date(b.date)
                    return dateA - dateB
                })
                this.setState({
                    events: sortEvents
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
                <div
                    className="dim pointer ma3 ph4 blue"
                    onClick={() => { this.props.history.push("/events/new") }}>
                        Create New Event
                </div>
                <hr />
                <div className="container-cards ma3 ph4 w-60">
                    {this.state.events.map((event, index) =>
                        <EventCard
                            key={event.id}
                            event={event}
                            isFirst={ index === 0 }
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