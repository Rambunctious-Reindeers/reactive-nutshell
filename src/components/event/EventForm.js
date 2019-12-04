/* author: James Chapman | this was pair coded with the rest of the group | purpose: this is the page that will populate the new events and edit events forms */

import React, { Component } from 'react'
import APIManager from '../module/APIManager';

class EventForm extends Component {

    state = {
        eventName: "",
        date: "",
        eventLocation: "",
        loadingStatus: false,
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    constructNewEvent = evt => {
        evt.preventDefault();
        if (this.state.eventName === "" || this.state.date === "" || this.state.eventLocation === "") {
            window.alert("Please enter a name and a date!")
        } else {
            this.setState({ loadingStatus: true });
            const event = {
                name: this.state.eventName,
                date: this.state.date,
                location: this.state.eventLocation
            }

            APIManager.post("events", event)
                .then(() => this.props.history.push("/events"))
        }
    }

    updateExistingEvent = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedEvent = {
            id: this.props.match.params.eventId,
            name: this.state.eventName,
            date: this.state.date,
            location: this.state.eventLocation,
        };

        APIManager.put("events", this.props.match.params.eventId, editedEvent)
            .then(() => this.props.history.push("/events"))
    };

    componentDidMount(){
        if(!this.props.isNew){
            APIManager.get("events", this.props.match.params.eventId)
            .then(event => {
              this.setState({
                eventName: event.name,
                date: event.date,
                eventLocation: event.location,
                loadingStatus: false,
              });
            });
        }
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="eventName"
                                placeholder="Event Name"
                                value= {this.state.eventName}
                            />
                            <label htmlFor="eventName">Name</label>
                            <input
                                type="date"
                                required
                                onChange={this.handleFieldChange}
                                id="date"
                                placeholder="date"
                                value= {this.state.date}
                            />
                            <label htmlFor="date">date</label>

                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="eventLocation"
                                placeholder="Location"
                                value= {this.state.eventLocation}
                            />
                            <label htmlFor="eventLocation">Location</label>
                            
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick=
                                {this.props.isNew ? this.constructNewEvent : this.updateExistingEvent}
                            >Submit</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default EventForm