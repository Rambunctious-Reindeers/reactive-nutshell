import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./Nutshell.css";

class Nutshell extends Component {

  state = {
    user: false
  }

  isAuthenticated = () => localStorage.getItem("credentials") !== null

  setUser = (authObj) => {
    localStorage.setItem(
      "credentials",
      JSON.stringify(authObj)
    )
    this.setState({
      user: this.isAuthenticated()
    });
  }

  clearUser = () => {
    localStorage.removeItem("credentials")
    
    this.setState({
      user: this.isAuthenticated
    });
  }

  componentDidMount(){
    this.setState({
      user: this.isAuthenticated()
    })
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} clearUser={this.clearUser} isAuthenticated={this.isAuthenticated}/>
        <ApplicationViews user={this.state.user} setUser={this.setUser} />
      </React.Fragment>
    );
  }
}

export default Nutshell;
