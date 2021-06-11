import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';


class Form extends Component {
    renderGenders({input, label}) {
        const gender = ['Male','Female'];
        return (
            <div className="field">
                <label>{label}</label>
                <select {...input}>
                    <option value="">Select a Gender...</option>
                    {gender.map(val => {
                        return <option value={val} key={val}>{val}</option>
                    })}
                </select>
            </div>
        )
    }

    renderCities({input, label}) {
        const Cities = ['Hyderabad','Bangalore','Chennai','New Delhi','Mumbai'];
        return (
            <div className="field">
                <label>{label}</label>
                <select {...input}>
                    <option value="">Select a City...</option>
                    {Cities.map(val => {
                        return <option value={val} key={val}>{val}</option>
                    })}
                </select>
            </div>
        )
    }

    renderInput({input, label}) {
        return  (
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete="off" />
            </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }



    render() {
        return (
            <form className="ui form" style={{width:'50%', height:'auto',margin:'0px auto'}}
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <Field name="email" component={this.renderInput} label="Enter Your Email ID" />
                <Field name="name" component={this.renderInput} label="Enter Your Name" />
                <Field name="gender" component={this.renderGenders} label="Select a Gender" />
                <Field name="city" component={this.renderCities} label="Select a City" />
                <button className="ui primary button">Update</button>
            </form>
        )
    }
}

export default reduxForm({
    form:'updateform'
})(Form);