import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserWithId } from '../actions';
import { reduxForm} from 'redux-form';
import _ from 'lodash';
import Form from './Form';

class UpdateUser extends Component {
    componentDidMount() {
        console.log("Initial Call");
        this.props.fetchUserWithId(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        console.log(formValues);
    }


    
    render() {
        console.log("initial values: ", this.props.users);
        return (
            <Form initialValues={_.pick(this.props.users,'email','name','gender','city')} onSubmit={this.onSubmit} />
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        users:state.users[ownProps.match.params.id]  
    }
};


const UpdateForm = reduxForm({form:'Update', enableReinitialize: true})(UpdateUser)

export default connect(mapStateToProps,{ fetchUserWithId })(UpdateForm);
