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
            window.alert("Please enter a name, date and location!")
        } else {
            this.setState({ loadingStatus: true });
            const event = {
                userId: JSON.parse(localStorage.getItem("credentials")).userId,
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
            userId: JSON.parse(localStorage.getItem("credentials")).userId,
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
                userId: JSON.parse(localStorage.getItem("credentials")).userId,
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
                <form className="ph5 pt4 pb5 mt5 ml4 br3 shadow-1 w-40">
                    <fieldset>
                        <label htmlFor="eventName" className="f6 b db mb2">Name</label>
                        <input
                            className="w-100"
                            type="text"
                            required
                            onChange={this.handleFieldChange}
                            id="eventName"
                            placeholder="Event name"
                            value= {this.state.eventName}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="date" className="f6 b db mb2">Date</label>
                        <input
                            className="w-100"
                            type="date"
                            required
                            onChange={this.handleFieldChange}
                            id="date"
                            value= {this.state.date}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="eventLocation" className="f6 b db mb2">Location</label>
                        <input
                            className="w-100"
                            type="text"
                            required
                            onChange={this.handleFieldChange}
                            id="eventLocation"
                            placeholder="Event location"
                            value= {this.state.eventLocation}
                        />
                    </fieldset>
                        <button
                            className="f6 fw5 bg-white orange hover-blue link pointer pa2 pv1 mt2 mb3 mr3 fr br2"
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.props.isNew ? this.constructNewEvent : this.updateExistingEvent}
                        >Submit</button>
                </form>
            </>
        )
    }
}

export default EventForm