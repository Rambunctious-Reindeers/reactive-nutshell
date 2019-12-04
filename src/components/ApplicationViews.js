import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login";
import ArticleList from "./news/ArticleList";
import ArticleForm from "./news/ArticleForm";
import EventList from "./event/EventList";
import EventForm from "./event/EventForm";
import FriendList from "./friend/FriendList";
import FriendForm from "./friend/FriendForm"
import MessageList from "./message/MessageList";
import MessageForm from "./message/MessageForm";
import TaskList from './task/TaskList'
import TaskForm from './task/TaskForm'
import RegistrationForm from "./auth/RegistrationForm";

localStorage.setItem("userId", 1);

export default class ApplicationViews extends Component {

  isAuthenticated = () => localStorage.getItem("credentials") !== null

  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/register" render={props => {
            return <RegistrationForm setUser={this.props.setUser} {...props} />
            
          }}
        />

        <Route
          exact path="/login" render={props => {
            return <Login setUser={this.props.setUser} {...props} />
          }}
        />

        <Route
          exact path="/friends" render={props => {
            return <FriendList {...props}/>
          }}
        />
                <Route 
        path="/friends/new" render={props => {
          return <FriendForm {...props} />
        }} 
        />

        <Route
          exact path="/messages" render={props => {
            return <MessageList {...props} />
          }}
        />
        <Route
          exact path="/messages/new" render={props => {
            return <MessageForm {...props} isNew={true} />

          }}
        />
        <Route
          exact path="/messages/:messageId(\d+)/edit" render={props => {
            return <MessageForm {...props} isNew={false} />
          }}
        />

        <Route
          exact path="/tasks" render={props => {
            return <TaskList {...props} />
          }}
        />
        <Route
          exact path="/tasks/new" render={props => {
            return <TaskForm {...props} isNew={true} />
          }}
        />
        <Route
          exact path="/tasks/:taskId(\d+)/edit" render={props => {
            return <TaskForm {...props} isNew={false} />
          }}
        />

        <Route
          exact path="/events" render={props => {
            return <EventList {...props} />
          }}
        />
        <Route
          exact path="/events/new" render={props => {
            return <EventForm {...props} isNew={true} />
          }}
        />
        <Route
          exact path="/events/:eventId(\d+)/edit" render={props => {
            return <EventForm {...props} isNew={false} />
          }}
        />

        <Route 
          exact path="/articles" 
          render={props => <ArticleList {...props} />} 
        />
        <Route 
          path="/articles/new" 
          render={props => <ArticleForm {...props} isNew={true} />} 
        />
        <Route 
          path="/articles/:articleId(\d+)/edit" 
          render={props => <ArticleForm {...props} isNew={false} />}
        />

      </React.Fragment>
    );
  }
}


