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
      <form className="ph5 pt4 pb5 mt5 ml4 br3 shadow-1 w-40" onSubmit={this.handleLogin}>
        <h3>Please sign in</h3>
          <fieldset>
            <label htmlFor="inputEmail" className="f6 b db mb2">Email Address</label>
            <input
              className="w-100"
              onChange={this.handleFieldChange} 
              type="email"
              id="email"
              placeholder="Email address"
              required="" autoFocus="" />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword" className="f6 b db mb2">Password</label>
            <input
              className="w-100"
              onChange={this.handleFieldChange} 
              type="password"
              id="password"
              placeholder="Password"
              required="" />
          </fieldset>
        <button 
          className="f6 fw5 bg-white orange hover-blue link pointer pa2 pv1 mt2 mb3 mr3 fr br2"
          type="submit">
            Sign in
        </button>
      </form>
    )
  }

}

export default Login