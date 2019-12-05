/* authors: James Chapman, Sullivan Pierce   Purpose: Login for the app */

import React, { Component } from "react"
import APIManager from "../module/APIManager"

class Login extends Component {

  // Set initial state
  state = {
    email: "",
    password: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  componentDidMount() {
    if (this.props.isAuthenticated()) {
      this.props.history.push("/messages")
    }
  }

  handleLogin = (evt) => {
    evt.preventDefault()
    APIManager.getAll(`users?email=${this.state.email}`)
      .then((userInfo) => {
        if (userInfo.length !== 0) {
          if (this.state.password === userInfo[0].password) {
            const authObj = {
              email: this.state.email,
              password: this.state.password,
              userId: userInfo[0].id,
              name: userInfo[0].username
            }
            this.props.setUser(authObj)
            this.props.history.push("/messages");
          } else {
            window.alert("This password does not match this email!")
          }
        } else {
          window.alert("This email does not have an account.")
        }
      })


  }



  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <fieldset>
          <h3>Please sign in</h3>
          <div className="formgrid">
            <label htmlFor="inputEmail">Email Address</label>
            <input onChange={this.handleFieldChange} type="email"
              id="email"
              placeholder="Email address"
              required="" autoFocus="" />

            <label htmlFor="inputPassword">Password</label>
            <input onChange={this.handleFieldChange} type="password"
              id="password"
              placeholder="Password"
              required="" />

          </div>
          <button type="submit">
            Sign in
            </button>
        </fieldset>
      </form>
    )
  }

}

export default Login