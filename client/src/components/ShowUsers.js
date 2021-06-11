import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchAllUsers } from '../actions';
import { Link } from 'react-router-dom';

class ShowUsers extends Component {
    componentDidMount() {
        this.props.fetchAllUsers();
    }

    renderUsers() {
        console.log(this.props.users)
        return this.props.users.map((user) => {
            return (
                <tbody>
                    <tr key={user._id}>
                        <td data-label="Name">{user.name}</td>
                        <td data-label="Age">{user.email}</td>
                        <td data-label="Gender">{user.gender}</td>
                        <td><Link to={`/users/edit/${user._id}`} className="ui button primary">Update</Link></td>
                        <td><Link to={`/users/delete/${user._id}`} className="ui button negative ">Delete</Link></td>
                    </tr>
                </tbody>
            )
        })
    }

    render() {
        return (
            <div>
                <Link to="/create" className="ui button primary">Create Post</Link>
                <table className="ui celled table">
                    <thead>
                        <tr><th>Name</th>
                        <th>EMail</th>
                        <th>Gender</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr></thead>
                    {this.renderUsers()}
               </table>
            </div>
        )
    }  
}

const mapStateToProps = (state) => {
    return { users: state.users.allUsers}
}

export default connect(mapStateToProps, { fetchAllUsers})(ShowUsers);

