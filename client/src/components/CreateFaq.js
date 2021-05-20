import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { CreateFQuestions } from '../actions'

class CreateFaq extends React.Component {
    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.CreateFQuestions(formValues);
    }

    render() {
        return (
            <form className="ui form" style={{width:'50%', height:'auto',margin:'0px auto'}}
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <div className="field">
                    <label>Select Categeory</label>
                    <Field name="cat_name" component="select" className="ui fluid dropdown">
                        <option />
                        <option value="MongoDB">MongoDB</option>
                        <option value="Node.js">Node.js</option>
                        <option value="React.js">React.js</option>
                        <option value="AWS">AWS</option>
                    </Field>
                </div>
                <div className="field">
                    <label>Enter Question?</label>
                    <Field
                        name="question"
                        type="text"
                        label="username"
                        component="input"
                    />
                </div>
                <div className="field">
                    <label>Enter Answer</label>
                    <Field
                        name="answer"
                        type="text"
                        label="username"
                        component="input"
                    />
                </div>
                                
                <button className="ui primary button">Signup</button>
            </form>
        )
    }
}

const FaqForm = reduxForm({form:'createfaq'})(CreateFaq)

export default connect(null,{ CreateFQuestions })(FaqForm);