import React from 'react';
import { connect } from 'react-redux';
import { fetchUserWithId, deleteUser } from '../actions';
import history from '../history';
import Modal from './Modal';
import { Link } from 'react-router-dom';


class DeleteUser extends React.Component {
    componentDidMount() {
        this.props.fetchUserWithId(this.props.match.params.id)
    }

    
    renderActions() {
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button 
                    onClick={() => this.props.deleteUser(id) } 
                    className="ui button negative">
                    Delete
                </button>
                <Link to="/users" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    renderContent () {
        if(!this.props.faq) {
            return 'Are you sure you want to delete this User?'
        }

        return `Are you sure you want to delete the stream with Email?`
    }

    render() {
        return (
            <Modal 
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/users')}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return { user: state.faq}
}

export default connect(mapStateToProps, { fetchUserWithId, deleteUser })(DeleteUser);