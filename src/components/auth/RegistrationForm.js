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
            <form className="ph5 pt4 pb5 mt5 ml4 br3 shadow-1 w-40" onSubmit={this.handleRegistration}>
                <h3>Register an Account</h3>
                <fieldset>
                    <label htmlFor="inputUsername" className="f6 b db mb2">Username</label>
                    <input
                        className="w-100"
                        onChange={this.handleFieldChange}
                        type="username"
                        id="username"
                        placeholder="Full Name"
                        required="" autoFocus="" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail" className="f6 b db mb2">Email Address</label>
                    <input
                        className="w-100"
                        onChange={this.handleFieldChange}
                        type="email"
                        id="email"
                        placeholder="Email Address"
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
                        required="" autoFocus="" />
                </fieldset>
                <button 
                    className="f6 fw5 bg-white orange hover-blue link pointer pa2 pv1 mt2 mb3 mr3 fr br2"
                    type="submit">
                        Register
                </button>
            </form>
        )
    }
}

export default RegistrationForm