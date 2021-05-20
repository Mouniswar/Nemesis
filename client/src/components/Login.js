import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm } from 'redux-form';
import { loginUser } from '../actions/index';

class Login extends Component {
    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.loginUser(formValues);
    }

    render() {
        return (
            <form 
                className="ui form" style={{width:'50%', height:'auto',margin:'0px auto'}}
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <div className="field">
                    <label>Enter Your Email ID</label>
                    <Field
                        name="email"
                        type="email"
                        label="Username"
                        component="input"
                    />
                </div>
                <div className="field">
                    <label>Password(Must be more than 7 Characters)</label>
                    <Field
                        name="password"
                        type="password"
                        component="input"
                    />
                </div>
                <button className="ui button primary">Login</button>
            </form>

        )
    }
}

const LoginForm = reduxForm({form: 'Login'})(Login)

export default connect(null, {loginUser})(LoginForm);

