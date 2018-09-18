import React from 'react';
import {Field, SubmissionError, reduxForm} from 'redux-form';
//import {required, nonEmpty, reqLength, isNumber} from '../validators';
import Input from './input';
//import {required, pristine, submitting} from '../validators';
//import './senderReceiver-add-form.css'; 


export class ReceiverAddForm extends React.Component {
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
      
      {/*<div>
        <FieldArray name="recipients" component={renderRecipients}/>
      </div>*/}
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
                <label htmlFor="RecipientFirstName" className="RecipientFirstName">First Name
                  <Field
                    name="RecipientFirstName"
                    type="text"
                    component={Input}
                  />
                </label>
                <label htmlFor="recipientLastName" className="recipientLastName">Recipient Last Name                            
                  <Field
                    name="recipientLastName"
                    type="text"
                    component={Input}
                  />
                </label>                            
                <label htmlFor="RecipientStreetAddress1" className="RecipientStreetAddress1">Recipient Street Address 1                            
                  <Field
                    name="RecipientStreetAddress1"
                    type="text"
                    component={Input}
                  />
                </label>                            
                <label htmlFor="RecipientStreetAddress2" className="RecipientStreetAddress2">Recipient Street Address 2                            
                  <Field
                    name="RecipientStreetAddress2"
                    type="text"
                    component={Input}
                  />
                </label>                            
                <label htmlFor="recipientCity" className="recipientCity">Recipient City                            
                  <Field
                    name="recipientCity"
                    type="text"
                    component={Input}
                  />
                </label>                            
                <label htmlFor=">recipientState" className="state">Recipient State                            
                  <Field
                    name="recipientState"
                    type="text"
                    component={Input}
                  />
                </label>                            
                <label htmlFor="recipientZipcode" className="recipientZipcode">Recipient Zipcode                           
                  <Field
                    name="recipientZipcode"
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
  form: 'receiverAddForm'
})(ReceiverAddForm); 
