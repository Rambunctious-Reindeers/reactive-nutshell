/* author: James Chapman   purpose: Registration for the app*/

import React, { Component } from 'react'
import APIManager from '../module/APIManager'

class RegistrationForm extends Component {

    state = {
        username:"",
        email: "",
        password: "",
        loadingStatus: false,
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleRegistration = (entry) => {
        entry.preventDefault()
        this.setState({ loadingStatus: true })
        const registration = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }
        APIManager.post("users", registration)
            .then(() => this.props.history.push("/"))
    }

    render(){
        return(
            <form onSubmit={this.handleRegistration}>
                <h3>Register an Account</h3>
                <div className="formgrid">
                    <input 
                    onChange={this.handleFieldChange}
                    type="username"
                    id="username"
                    placeholder="Full Name"
                    required="" autoFocus="" />
                    <label htmlFor="inputUsername">Username</label>

                    <input 
                    onChange={this.handleFieldChange}
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    required="" autoFocus="" />
                    <label htmlFor="inputEmail">Email Address</label>

                    <input 
                    onChange={this.handleFieldChange}
                    type="password"
                    id="password"
                    placeholder="Password"
                    required="" autoFocus="" />
                    <label htmlFor="inputPassword">Password</label>

                </div>

                <button type="submit">
                    Register
                </button>
            </form>
        )
    }
}

export default RegistrationForm