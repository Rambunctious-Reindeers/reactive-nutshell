import { Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home";
import Login from "./auth/Login";
import ArticleList from "./news/ArticleList";
import ArticleForm from "./news/ArticleForm";
import EventList from "./event/EventList";
import EventForm from "./event/EventForm";
import TaskList from './task/TaskList'
import TaskForm from './task/TaskForm'

localStorage.setItem("userId", 1);

export default class ApplicationViews extends Component {

  isAuthenticated = () => localStorage.getItem("credentials") !== null

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={props => Home} />

        <Route
          exact path="/register" render={props => {
            return null
            // Remove null and return the component which will handle user registration
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
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          exact path="/tasks" render={props => {
            return <TaskList {...props} />
          }}
        />

        <Route
          exact path="/tasks/new" render={props => {
            return <TaskForm {...props} isNew={true}/>
          }}
        />

        <Route
          exact path="/tasks/:taskId(\d+)/edit" render={props => {
            return <TaskForm {...props} isNew={false}/>
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
