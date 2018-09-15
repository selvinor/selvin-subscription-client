import React from 'react';
import {Field, SubmissionError, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Input from './input';
//import {required, pristine, submitting} from '../validators';
import './subscription-add-form.css'; 
import { jumpToSection, addRecipientForm } from '../actions';

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
    let formButton;

    if (this.props.submitSucceeded) {
      successMessage = (
        <div className= "message message-success">
          Message submitted successfully
        </div>
      );
    }
  
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className= "message message-success">
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

    //Set custom button for each section
    switch (this.props.currentFormSection) {
      case 'arrangement':
        formButton = ( <button onClick={() => this.props.dispatch(jumpToSection('schedule'))}  type="button">SELECT</button>); 
        break;
      case 'schedule':
        formButton = ( <button onClick={() => this.props.dispatch(jumpToSection('sender'))}  type="button">Schedule it</button>); 
        break;
      case 'sender':
        formButton = ( <button onClick={() => this.props.dispatch(jumpToSection('receiver'))}  type="button">Add Sender</button>);
        break;
      case 'receiver':
        formButton = ( <button onClick={() => this.props.dispatch(jumpToSection('checkout'))}  type="button">Add Receiver</button>);
        break;
      case 'checkout':
        formButton = (<button type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button>);
        break;
      case 'confirm':
        formButton = ( <button onClick={() => this.props.dispatch(jumpToSection('arrangement'))}  type="button">Finish</button>); 
        break;
      default:
        formButton = ( <button onClick={() => this.props.dispatch(jumpToSection('arrangement'))}  type="button">Finish</button>); 
      break;
    }   

    const addReceiverButton = (<button onClick={() => this.props.dispatch(addRecipientForm())}  type="button">ADD ANOTHER RECIPIENT</button>);
    const addRecipient = (
      <ul>
        <li>
          <h3>ADD RECIPIENT</h3>
        </li>
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
            <label htmlFor="streetAddress1" className="streetAddress1">Street Address 1                            
              <Field
                name="streetAddress1"
                type="text"
                component={Input}
              />
            </label>                            
            <label htmlFor="streetAddress2" className="streetAddress2">Street Address 2                            
              <Field
                name="streetAddress2"
                type="text"
                component={Input}
              />
            </label>                            
            <label htmlFor="city" className="city">City                            
              <Field
                name="city"
                type="text"
                component={Input}
              />
            </label>                            
            <label htmlFor="state" className="state">State                            
              <Field
                name="state"
                type="text"
                component={Input}
              />
            </label>                            
            <label htmlFor="zipcode" className="zipcode">Zipcode                           
              <Field
                name="zipcode"
                type="text"
                component={Input}
              />
            </label>                            
          </div>
        </li>
        <li>
          <h4>DELIVERY TYPE</h4>
        </li>
        <li>
          <div className="deliveryType business form-input">
            <label htmlFor="large" className="business">Business 
              <Field
              name="deliveryType"
              type="radio"
              component={Input}
              className="deliveryRadio"
            /></label>
          </div>
          <div className="deliveryType residential form-input">
            <label htmlFor="large" className="residential">Residence
            <Field
              name="deliveryType"
              type="radio"
              component={Input}
              className="deliveryRadio"
            /></label>
          </div>
          <div className="receiverMsg form-input">
          <label htmlFor="receiverMsg" className="receiverMsg">Message</label> 
            <Field
              name="receiverMsg"
              type="textarea"
              component={Input}
            />
          </div>
          {addReceiverButton}
        </li>
      </ul>
    );
    let receiverArray = [];
    const buildReceiverArray = (addRecipient) => {
      for (let i=1; i <= this.props.numRecipientsToAdd; i++) {
          receiverArray = [...receiverArray, addRecipient]         
      }
    };
    


    return (
      <div>
        <h1>FLOWER SUBSCRIPTION SERVICE</h1>
        <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          {successMessage}
          {errorMessage} 
          
      { this.props.currentFormSection === "arrangement" ?  


            
        <ul>
          <li><h3>CHOOSE THE ARRANGEMENT TYPE</h3></li>
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
      : "" }
      { this.props.currentFormSection === "schedule" ?  
        
        <ul>
          <li className="schedule">
          <h3>SCHEDULE DELIVERY</h3> 
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
        </ul> 
      : ""  }  
      { this.props.currentFormSection === "sender" ?             
        <ul>
        <li>

          <div className="form-input">
                           
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
      : ""  }  
      { this.props.currentFormSection === "receiver" ?             
        <ul>
          <li>
            <h3>ADD RECIPIENT</h3>
          </li>
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
              <label htmlFor="streetAddress1" className="streetAddress1">Street Address 1                            
                <Field
                  name="streetAddress1"
                  type="text"
                  component={Input}
                />
              </label>                            
              <label htmlFor="streetAddress2" className="streetAddress2">Street Address 2                            
                <Field
                  name="streetAddress2"
                  type="text"
                  component={Input}
                />
              </label>                            
              <label htmlFor="city" className="city">City                            
                <Field
                  name="city"
                  type="text"
                  component={Input}
                />
              </label>                            
              <label htmlFor="state" className="state">State                            
                <Field
                  name="state"
                  type="text"
                  component={Input}
                />
              </label>                            
              <label htmlFor="zipcode" className="zipcode">Zipcode                           
                <Field
                  name="zipcode"
                  type="text"
                  component={Input}
                />
              </label>                            
            </div>
          </li>
          <li>
            <h4>DELIVERY TYPE</h4>
          </li>
          <li>
            <div className="deliveryType business form-input">
              <label htmlFor="large" className="business">Business 
                <Field
                name="deliveryType"
                type="radio"
                component={Input}
                className="deliveryRadio"
              /></label>
            </div>
            <div className="deliveryType residential form-input">
              <label htmlFor="large" className="residential">Residence
              <Field
                name="deliveryType"
                type="radio"
                component={Input}
                className="deliveryRadio"
              /></label>
            </div>
            <div className="receiverMsg form-input">
            <label htmlFor="receiverMsg" className="receiverMsg">Message</label> 
                <Field
                  name="receiverMsg"
                  type="textarea"
                  component={Input}
                />
            </div>
            {addReceiverButton}
          </li>
        </ul>          
      : ""  }
        { buildReceiverArray }
        { formButton }
      </form> 
      </div>
    )
  }
}   
const mapStateToProps = state => ({
  currentFormSection: state.subscription.currentFormSection,
  numRecipientsToAdd: state.subscription.numRecipientsToAdd
  })

  const mapDispatchToProps = dispatch => {
    return {
      jumpToSection: () => {
        dispatch(jumpToSection())
      },
      addRecipientForm: () => {
        dispatch(addRecipientForm())
      }
    }
  };
 

SubscriptionAddForm = connect(mapStateToProps, mapDispatchToProps)(SubscriptionAddForm)

export default reduxForm({
  form: 'subscriptionAddForm'
})(SubscriptionAddForm); 
