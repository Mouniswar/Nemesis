import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions'

class Header extends Component {
    onLogoutClick = () => {
        this.props.logoutUser()
    }

    renderNavContent = () => {
        if(localStorage.getItem("token")) {
            console.log("True")

            console.log(this.props)
            return (
                <React.Fragment>
                    <Link to="/" className="ui button secondary" onClick={() => this.onLogoutClick()}>Sign Out</Link>
                </React.Fragment>
            )
        } else if(!localStorage.getItem("token")) {
            console.log("False")
            return(
                <React.Fragment>
                    <Link to="/login" className="item">Login</Link>
                    <Link to="/signup" className="item">Signup</Link>
                </React.Fragment>
            )
        }
    }

    

    render() {
        return (
            <div className="ui pointing menu">
                <Link to="/users" className="active item">
                    Friends
                </Link>
                <div className="right menu">
                    {this.renderNavContent()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {auth: state.authentication}
}

export default  connect(mapStateToProps, { logoutUser })(Header);