import React from 'react';
import {Field, SubmissionError, reduxForm} from 'redux-form';
//import {required, nonEmpty, reqLength, isNumber} from '../validators';
import Input from './input';
//import {required, pristine, submitting} from '../validators';
//import './recipient-add-form.css'; 


export class RecipientAddForm extends React.Component {
  onSubmit(values) {
    return fetch('http://localhost:8080/api/recipients', {
      method:'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) {
        if (
          res.headers.has('content-type') &&
          res.headers
            .get('content-type')
            .startsWith('application/json')
        ) {
            // It's a nice JSON error returned by us, so decode it
            return res.json().then(err => Promise.reject(err));
        }
        // It's a less informative error returned by express
        return Promise.reject({
          code: res.status,
          message: res.statusText
        });
      }
      return;
    })
    .then(() => console.log('Submitted with values', values))
    .catch(err => {
      const {reason, message, location} = err;
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
            new SubmissionError({
                [location]: message
            })
        );
      }
      return Promise.reject(
        new SubmissionError({
            _error: 'Error submitting message'
        })
      );
    });
  }
  render() {
    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className= "message message-successs">
          Message submitted successfully
        </div>
      );
    }
    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }
    return (
      <div>
        <h1>ADD RECIPIENT(S)</h1>
        <form onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
          )}>
          {successMessage}
          {errorMessage} 
          <ul>
            <li>
              <div className="form-input">
                <label htmlFor="firstName" className="firstName">First Name
                  <Field
                    name="firstName"
                    type="text"
                    component={Input}
                  />
                </label>
                <label htmlFor="lastName" className="lastName">Last Name                            
                  <Field
                    name="lastName"
                    type="text"
                    component={Input}
                  />
                </label>                            
                <label htmlFor="lastName" className="lastName">Street Address 1                            
                  <Field
                    name="streetAddress1"
                    type="text"
                    component={Input}
                  />
                </label>                            
                <label htmlFor="streetAddress2" className="lastName">Street Address 2                            
                  <Field
                    name="streetAddress2"
                    type="text"
                    component={Input}
                  />
                </label>                            
                <label htmlFor="lastName" className="lastName">City                            
                  <Field
                    name="city"
                    type="text"
                    component={Input}
                  />
                </label>                            
                <label htmlFor="state" className="lastName">State                            
                  <Field
                    name="state"
                    type="text"
                    component={Input}
                  />
                </label>                            
                <label htmlFor="zipcode" className="lastName">Zipcode                           
                  <Field
                    name="zipcode"
                    type="text"
                    component={Input}
                  />
                </label>                            
              </div>
            </li>
          </ul>  
        {/* <button type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button> */}
          <button type="button" >ADD</button> 
        </form> 
      </div>

    )
  }
}
export default reduxForm({
  form: 'recipientAddForm'
})(RecipientAddForm); 
