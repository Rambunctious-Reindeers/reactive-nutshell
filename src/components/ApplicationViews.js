import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./auth/Login";
import ArticleList from "./news/ArticleList";
import ArticleForm from "./news/ArticleForm";
import EventList from "./event/EventList";
import EventForm from "./event/EventForm";
import MessageList from "./message/MessageList";
import MessageForm from "./message/MessageForm";
import TaskList from './task/TaskList'
import TaskForm from './task/TaskForm'
import RegistrationForm from "./auth/RegistrationForm";
import { Redirect } from "react-router-dom"


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
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          exact path="/messages" render={props => {
            if (this.props.user) {
              return <MessageList {...props} />
            } else { return <Redirect to="/login" /> }
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
            if (this.props.user) {
              return <TaskList {...props} />
            } else { return <Redirect to="/login" /> }
          }}
        />
        <Route
          exact path="/tasks/new" render={props => {
            if (this.props.user) {
              return <TaskForm {...props} isNew={true} />
            } else { return <Redirect to="/login" /> }
          }}
        />
        <Route
          exact path="/tasks/:taskId(\d+)/edit" render={props => {
            if (this.props.user) {
              return <TaskForm {...props} isNew={false} />
            } else { return <Redirect to="/login" /> }
          }}
        />

        <Route
          exact path="/events" render={props => {
            if (this.props.user) {
              return <EventList {...props} />
            } else { return <Redirect to="/login" /> }
          }}
        />
        <Route
          exact path="/events/new" render={props => {
            if (this.props.user) {
              return <EventForm {...props} isNew={true} />
            } else { return <Redirect to="/login" /> }
          }}
        />
        <Route
          exact path="/events/:eventId(\d+)/edit" render={props => {
            if (this.props.user) {
              return <EventForm {...props} isNew={false} />
            } else { return <Redirect to="/login" /> }
          }}
        />

        <Route
          exact path="/articles"
          render={props => {
            if (this.props.user) {
            return <ArticleList {...props} />
          } else { return <Redirect to="/login" /> }
          }}
        />
        <Route
          path="/articles/new"
          render={props => { 
            if (this.props.user) {
            return <ArticleForm {...props} isNew={true} /> 
          } else { return <Redirect to="/login" /> }
          }
          }
        />
        <Route
          path="/articles/:articleId(\d+)/edit"
          render={props => { 
            if (this.props.user) {
            return <ArticleForm {...props} isNew={false} /> 
          } else { return <Redirect to="/login" /> }
          }
          }
        />

      </React.Fragment>
    );
  }
}
