/* authors: James Chapman, Sullivan Pierce   purpose: Registration for the app*/

import React, { Component } from 'react'
import APIManager from '../module/APIManager'

class RegistrationForm extends Component {

    state = {
        username: "",
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
        if(this.state.username ==="" || this.state.email === "" || this.state.password === ""){
            window.alert("You must fill in every field.")
        } else {
            this.setState({ loadingStatus: true })
    const registration = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
    }
    APIManager.post("users", registration)
        .then(() =>
            APIManager.getAll(`users?email=${this.state.email}`)
                .then((newUser) => {
                    this.props.setUser({
                        email: this.state.email,
                        password: this.state.password,
                        userId: newUser[0].id,
                        name: newUser[0].username
                    })
                    this.props.history.push("/messages")
                })

        )
        }
    }

    

    render() {
        return (
            <form onSubmit={this.handleRegistration}>
                <h3>Register an Account</h3>
                <div className="formgrid">
                    <label htmlFor="inputUsername">Username</label>
                    <input
                        onChange={this.handleFieldChange}
                        type="username"
                        id="username"
                        placeholder="Full Name"
                        required="" autoFocus="" />

                    <label htmlFor="inputEmail">Email Address</label>
                    <input
                        onChange={this.handleFieldChange}
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        required="" autoFocus="" />

                    <label htmlFor="inputPassword">Password</label>
                    <input
                        onChange={this.handleFieldChange}
                        type="password"
                        id="password"
                        placeholder="Password"
                        required="" autoFocus="" />

                </div>

                <button type="submit">
                    Register
                </button>
            </form>
        )
    }
}

export default RegistrationForm