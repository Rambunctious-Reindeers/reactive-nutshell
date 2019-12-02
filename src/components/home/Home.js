import React, { Component } from "react";
import FriendList from '../friend/FriendList'
import MessageList from '../message/MessageList'
import NewsList from '../news/NewsList'
import EventList from '../event/EventList'
import TaskList from '../event/EventList'

export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <div id="friendContainer" className="container">
                    <FriendList />
                </div>
                <div id="messageContainer" className="container">
                    <MessageList />
                </div>
                <div id="newsContainer" className="container">
                    <NewsList />
                </div>
                <div id="eventContainer" className="container">
                    <EventList />
                </div>
                <div id="taskContainer" className="container">
                    <TaskList />
                </div>


            </React.Fragment>
        );
    }
}
