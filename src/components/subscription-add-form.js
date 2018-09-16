import React from 'react';
import {Field, SubmissionError, FieldArray, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Input from './input';
//import {required, pristine, submitting} from '../validators';
import './subscription-add-form.css'; 
import { jumpToSection, setNumberOfDeliveries } from '../actions';

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
        formButton = ( <button onClick={() => this.props.dispatch(setNumberOfDeliveries(1))}  type="button">Schedule it</button>); 
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

    const addReceiverButton = (<button onClick={() => this.props.dispatch(setNumberOfDeliveries())}  type="button">ADD ANOTHER RECIPIENT</button>);
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth()+1; //January is 0!
      let yyyy = today.getFullYear();
      
      if(dd<10) {
          dd = '0'+dd
      } 
      
      if(mm<10) {
          mm = '0'+mm
      } 
      
      today = mm + '/' + dd + '/' + yyyy;
    
    
    // const addRecipient = props => (
    // <div className="recipientsArray">
    //   {props.field.map(id => (
    //     <ul>
    //       <li>
    //         <h3>ADD RECIPIENT</h3>
    //       </li>
    //       <li>
    //         <div className="form-input">
    //           <label htmlFor="firstName" className="firstName">First Name
    //             <Field
    //               name="firstName"
    //               type="text"
    //               component={Input}
    //             />
    //           </label>
    //           <label htmlFor="lastName" className="lastName">Last Name                            
    //             <Field
    //               name="lastName"
    //               type="text"
    //               component={Input}
    //             />
    //           </label>                            
    //           <label htmlFor="streetAddress1" className="streetAddress1">Street Address 1                            
    //             <Field
    //               name="streetAddress1"
    //               type="text"
    //               component={Input}
    //             />
    //           </label>                            
    //           <label htmlFor="streetAddress2" className="streetAddress2">Street Address 2                            
    //             <Field
    //               name="streetAddress2"
    //               type="text"
    //               component={Input}
    //             />
    //           </label>                            
    //           <label htmlFor="city" className="city">City                            
    //             <Field
    //               name="city"
    //               type="text"
    //               component={Input}
    //             />
    //           </label>                            
    //           <label htmlFor="state" className="state">State                            
    //             <Field
    //               name="state"
    //               type="text"
    //               component={Input}
    //             />
    //           </label>                            
    //           <label htmlFor="zipcode" className="zipcode">Zipcode                           
    //             <Field
    //               name="zipcode"
    //               type="text"
    //               component={Input}
    //             />
    //           </label>                            
    //         </div>
    //       </li>
    //       <li>
    //         <h4>DELIVERY TYPE</h4>
    //       </li>
    //       <li>
    //         <div className="deliveryType business form-input">
    //           <label htmlFor="large" className="business">Business 
    //             <Field
    //             name="deliveryType"
    //             type="radio"
    //             component={Input}
    //             className="deliveryRadio"
    //           /></label>
    //         </div>
    //         <div className="deliveryType residential form-input">
    //           <label htmlFor="large" className="residential">Residence
    //           <Field
    //             name="deliveryType"
    //             type="radio"
    //             component={Input}
    //             className="deliveryRadio"
    //           /></label>
    //         </div>
    //         <div className="receiverMsg form-input">
    //         <label htmlFor="receiverMsg" className="receiverMsg">Message</label> 
    //           <Field
    //             name="receiverMsg"
    //             type="textarea"
    //             component={Input}
    //           />
    //         </div>
    //         {addReceiverButton}
    //       </li>
    //     </ul>     
    //   ))}
    //   </div>
    // );

    // let receiverArray = [];
    // console.log('addRecipient.props: ', addRecipient.props);
    // const buildReceiverArray = (addRecipient) => {
    //   for (let i=1; i <= this.props.numRecipientsToAdd; i++) {
    //       receiverArray = [...receiverArray, addRecipient]         
    //   }
    //   return receiverArray;
    // };
    const renderField = ({ input, label, type, meta: { touched, error } }) => (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} type={type} placeholder={label}/>
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    )
    
    const renderRecipients = ({ fields, meta: { touched, error } }) => (
      <ul>
        <li>
          <button type="button" onClick={() => fields.push({})}>Add Recipient</button>
          {touched && error && <span>{error}</span>}
        </li>
        {fields.map((member, index) =>
          <li key={index}>
            <button
              type="button"
              title="Remove Recipient"
              onClick={() => fields.remove(index)}/>
            <h4>Recipient #{index + 1}</h4>
            <Field
              name={`${member}.firstName`}
              type="text"
              component={renderField}
              label="First Name"/>
            <Field
              name={`${member}.lastName`}
              type="text"
              component={renderField}
              label="Last Name"/>
            <Field
              name={`${member}.addressLine1`}
              type="text"
              component={renderField}
              label="Address Line 1"/>
            <Field
              name={`${member}.addressLine2`}
              type="text"
              component={renderField}
              label="Address Line 2"/>
            <Field
              name={`${member}.city`}
              type="text"
              component={renderField}
              label="City"/>
            <Field
              name={`${member}.state`}
              type="text"
              component={renderField}
              label="State"/>
            <Field
              name={`${member}.zipcode`}
              type="text"
              component={renderField}
              label="Zip Code"/>
            <Field
              name={`${member}.phone`}
              type="text"
              component={renderField}
              label="Phone Number"/>
            <Field
              name={`${member}.deliveryType`}
              type="radio"
              component={renderField}
              label="Residence"/>
            <Field
              name={`${member}.deliveryType`}
              type="radio"
              component={renderField}
              label="Business"/>
            <FieldArray name={`${member}.deliveries`} component={renderDeliveries}/>
          </li>
        )}
      </ul>
    )
    
    const renderDeliveries = ({ fields, meta: { error } }) => (
      <ul>
        <li>
          <button type="button" onClick={() => fields.push()}>Add Delivery</button>
        </li>
        {fields.map((delivery, index) =>
          <li key={index}>
            <button
              type="button"
              title="Remove Delivery"
              onClick={() => fields.remove(index)}/>
            <Field
              name={delivery}
              type="text"
              component={renderField}
              label={`Delivery #${index + 1}`}/>
          </li>
        )}
        {error && <li className="error">{error}</li>}
      </ul>
    )

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
      <div>
        <FieldArray name="recipients" component={renderRecipients}/>
      </div>

      : ""  }

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
      setNumberOfDeliveries: () => {
        dispatch(setNumberOfDeliveries())
      }
    }
  };
 

SubscriptionAddForm = connect(mapStateToProps, mapDispatchToProps)(SubscriptionAddForm)

export default reduxForm({
  form: 'subscriptionAddForm'
})(SubscriptionAddForm); 
