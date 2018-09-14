import React from 'react';
import {Field, SubmissionError, reduxForm} from 'redux-form';

import Input from './input';
//import {required, pristine, submitting} from '../validators';
import './subscription-add-form.css'; 
import subscriptionInput from './subscription-input'; 

export class SubscriptionAddForm extends React.Component {
  onSubmit(values) {
    return fetch('http://localhost:8080/api/subscriptions', {
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
    let subscriptionFields;
    let formButton;

    if (this.props.submitSucceeded) {
      successMessage = (
        <div className= "message message-successs">
          Message submitted successfully
        </div>
      );
    }
  
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
    //state flags for form control
    // arrangementChosen 
    // subscriptionChosen
    // recipientsChosen

    let formFields = `

    `

    if (this.props.arrangementChosen) {
      subscriptionFields = {subscriptionInput};
    }

    if (this.props.recipientsChosen) {
      formButton = (<button type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button>); 
    } else {
      formButton = ( <button type="button">Continue</button>); 
    }






    return (
      <div>
        <h1>SUBSCRIBE</h1>
        <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          {successMessage}
          {errorMessage} 
          <h2>Choose an Arrangement</h2>
          <ul>
            <li className="arrangement">
              <div className="thumb">
                <img className="thumbnail" src="../img/flowers.jpg" alt=""/> 
              </div>
              <div className="flowerChoice form-input">            
                <Field
                  name="choice"
                  type="radio"
                  component={Input}
                  label="Designer's Lobby Arrangement"
                />
              </div>
            </li>
            <li className="arrangement"> 
              <div className="thumb">
                <img className="thumbnail" src="../img/flowers.jpg" alt=""/> 
              </div>
              <div className="flowerChoice form-input">
                <Field
                  name="choice"
                  type="radio"
                  component={Input}
                  label="Designer's Choice Arrangement"
                />
              </div>
            </li>
            <li className="arrangement">
              <div className="thumb">
                <img className="thumbnail" src="../img/flowers.jpg" alt=""/> 
              </div>
              <div className="flowerChoice form-input">
                <Field
                  name="choice"
                  type="radio"
                  component={Input}
                  label="Designer's Bouquet"
                />
              </div>
            </li>
          </ul>
          <ul>
            <li className="gift">
              <h3>CHOOSE SCHEDULE</h3>
              <div className="gift form-input">
                <label htmlFor="large">Gift Subscription
                  <Field
                  name="gift"
                  type="radio"
                  component={Input}
                  className="gift"
                /></label>
              </div>
              <div className="personal form-input">
                <label htmlFor="large">Personal Subscription
                <Field
                  name="gift"
                  type="radio"
                  component={Input}
                  className="personal"
                /></label>
              </div>
              <div className="form-input">
                <label htmlFor="giftmsg" className="giftMsg">Gift Message
                  <Field
                    name="giftmsg"
                    type="textarea"
                    component={Input}
                  /></label>                            
              </div>
            </li>
            <li>
              <div className="frequency form-input">
                <label className="frequency">FREQUENCY</label>
                  <Field
                    name="frequency"
                    type="radio"
                    component={Input}
                    label="weekly"
                  />
                  <Field
                    name="frequency"
                    type="radio"
                    component={Input}
                    label="bi-weekly"
                  />
                  <Field
                    name="frequency"
                    type="radio"
                    component={Input}
                    label="monthly"
                  />           
              </div>
            </li>
            <li>
              <div className="form-input duration" >
                <label className="duration">DURATION</label>
                  <Field
                    name="duration"
                    type="radio"
                    component={Input}
                    label="3 months"
                  />
                  <Field
                    name="duration"
                    type="radio"
                    component={Input}
                    label="6 months"
                  />
                  <Field
                    name="duration"
                    type="radio"
                    component={Input}
                    label="12 months"
                  />
                  <Field
                    name="duration"
                    type="radio"
                    component={Input}
                    label="on-going" 
                  />              
              </div>
            </li>
            <li>
              <h3>ENTER SENDER INFORMATION</h3>
              <div className="senderInfo">
                <label htmlFor="senderEmail" className="senderEmail">Sender Email</label>                            
                  <Field
                    name="senderEmail"
                    type="email"
                    component={Input}
                  />
                                            
                <label htmlFor="senderFirstName" className="senderFirstName">Sender First Name</label>
                  <Field
                    name="senderFirstName"
                    type="text"
                    component={Input}
                  />
                
                <label htmlFor="senderLastName" className="senderLastName">Sender Last Name</label>                            
                  <Field
                    name="senderLastName"
                    type="text"
                    component={Input}
                  />
                                          
                <label htmlFor="senderPhone" className="senderPhone">Sender Phone</label>                            
                  <Field
                    name="senderPhone"
                    type="text"
                    component={Input}
                  />                                      
              </div>
            </li>
          </ul> 
          {formButton}
        </form> 
      </div>
    )
  }
}
export default reduxForm({
  form: 'subscriptionAddForm'
})(SubscriptionAddForm); 
