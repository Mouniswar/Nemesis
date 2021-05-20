import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createUser } from '../actions'

class Signup extends React.Component {
    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.createUser(formValues);
    }

    render() {
        return (
            <form className="ui form" style={{width:'50%', height:'auto',margin:'0px auto'}}
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
               <div className="field">
                    <label>Enter Your Email ID</label>
                    <Field
                        name="email"
                        type="email"
                        label="name"
                        component="input"
                    />
                </div>
                <div className="field">
                    <label>Enter Your Name</label>
                    <Field
                        name="name"
                        type="text"
                        label="username"
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
                <div className="field">
                    <label>Gender</label>
                    <Field name="gender" component="select" className="ui fluid dropdown">
                        <option />
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Field>
                </div>
                <div className="field">
                    <label>Select City</label>
                    <Field name="city" component="select" className="ui fluid dropdown">
                        <option />
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="delhi">New Delhi</option>
                    </Field>
                </div>
                
                <button className="ui primary button">Signup</button>
            </form>
        )
    }
}

const SignupForm = reduxForm({form:'Signup'})(Signup)

export default connect(null,{ createUser })(SignupForm);