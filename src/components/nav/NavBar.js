import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {

    handleLogout = () => {
        this.props.clearUser()
        this.props.history.push('/')
    }

    render() {
        return (
            <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">

                    <li className="nav-item">
                        <Link className="nav-link" to="/articles">Articles</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/friends">Friends</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/messages">Messages</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/tasks">Tasks</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/events">Events</Link>
                    </li>

                </ul>
                <span className="navbar-text">
                    <ul className="nav nav-pills nav-fill">

                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>


                    </ul>
                </span>
            </nav>
        )
    }
}

export default withRouter(NavBar)
