import React from 'react';
import {Field, SubmissionError, FieldArray, formValueSelector, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Input from './input';
//import {required, pristine, submitting} from '../validators';
import './subscription-add-form.css'; 
import { jumpToSection, setNumberOfDeliveries, setProductChoice, setFrequency, setDuration } from '../actions';

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
    const dispatchArrangement = (choice) => {
      this.props.dispatch(setProductChoice(choice)) ;
    }
    const dispatchFrequency = (frequency) => {
      this.props.dispatch(setFrequency(frequency));
    }    
    const dispatchDuration = (duration) => {
      this.props.dispatch(setDuration(duration)) ;
    }        
    const dispatchNumberOfDeliveries = () => {
      console.log( 'starting dispatchNumberOfDeliveries')
      let numberOfDeliveries; 
      let subscriptionTerm;
      console.log('this.props.currentFrequency: ', this.props.currentFrequency);

      //subscriptionTerm === "on-going" ? 12 : Number(this.props.duration);     
      //console.log('subscriptionTerm: ', subscriptionTerm);
      switch (this.props.currentDuration) {
        case '3 months':
        subscriptionTerm = 3; 
          break;
        case '6 months':
        subscriptionTerm = 6;  
          break;
        case '12 months':
        subscriptionTerm = 12; 
        break;
        default:
        subscriptionTerm = 12;
        break;
      }   


      switch (this.props.currentFrequency) {
        case 'monthly':
          numberOfDeliveries = subscriptionTerm; 
          break;
        case 'bi-weekly':
          numberOfDeliveries = subscriptionTerm * 2;   
          break;
        case 'weekly':
          numberOfDeliveries = subscriptionTerm * 4; 
          break;
        case 'on-going':
          numberOfDeliveries = 99; 
          break;
        default:
          numberOfDeliveries = 12;
        break;
      }   
      console.log('numberOfDeliveries: ', numberOfDeliveries);
      this.props.dispatch(setNumberOfDeliveries(numberOfDeliveries));
      
    }
    formButton = ( <button onClick={() => console.log('state: ', this.props)}  type="button">Schedule it</button>); 

    //Set custom button for each section
 
    switch (this.props.currentFormSection) {
      case 'schedule':
        formButton = ( <button className="jump" onClick={() => dispatchNumberOfDeliveries()}  type="button">Schedule it</button>); 
        break;
      case 'sender':
        formButton = ( <button className="jump"  onClick={() => this.props.dispatch(jumpToSection('receiver'))}  type="button">Add Sender</button>);
        break;
      case 'receiver':
        formButton = ( <button className="jump"  onClick={() => this.props.dispatch(jumpToSection('checkout'))}  type="button">Add Receiver</button>);
        break;
      case 'checkout':
        formButton = (<button  className="jump" type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button>);
        break;
      case 'confirm':
        formButton = ( <button className="jump"  onClick={() => this.props.dispatch(jumpToSection('arrangement'))}  type="button">Finish</button>); 
        break;
      default:
        formButton = ( <button className="jump"  onClick={() => this.props.dispatch(jumpToSection('arrangement'))}  type="button">Finish</button>); 
      break;
    }   

   // const addReceiverButton = (<button onClick={() => this.props.dispatch(setNumberOfDeliveries())}  type="button">ADD ANOTHER RECIPIENT</button>);
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
    console.log('today is: ', today);
    console.log('this.props: ', this.props);
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
          <button type="button" onClick={() => fields.push({})}>Add a Recipient</button>
          {touched && error && <span>{error}</span>}
        </li>
        {fields.map((recipient, index) =>
          <li key={index}>
            <button
              type="button"
              title="Remove Recipient"
              onClick={() => fields.remove(index)}>Remove</button>
            <h4>Recipient #{index + 1}</h4>
            <Field
              name={`${recipient}.firstName`}
              type="text"
              component={renderField}
              label="First Name"/>
            <Field
              name={`${recipient}.lastName`}
              type="text"
              component={renderField}
              label="Last Name"/>
            <Field
              name={`${recipient}.addressLine1`}
              type="text"
              component={renderField}
              label="Address Line 1"/>
            <Field
              name={`${recipient}.addressLine2`}
              type="text"
              component={renderField}
              label="Address Line 2"/>
            <Field
              name={`${recipient}.city`}
              type="text"
              component={renderField}
              label="City"/>
            <Field
              name={`${recipient}.state`}
              type="text"
              component={renderField}
              label="State"/>
            <Field
              name={`${recipient}.zipcode`}
              type="text"
              component={renderField}
              label="Zip Code"/>
            <Field
              name={`${recipient}.phone`}
              type="text"
              component={renderField}
              label="Phone Number"/>
            <Field
              name={`${recipient}.deliveryType`}
              type="radio"
              component={renderField}
              label="Residence"/>
            <Field
              name={`${recipient}.deliveryType`}
              type="radio"
              component={renderField}
              label="Business"/>
            <FieldArray name={`${recipient}.deliveries`} component={renderDeliveries}/>
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
              onClick={() => fields.remove(index)}>Remove</button>
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
        <h2>FLOWER SUBSCRIPTION SERVICE</h2>
        <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          {successMessage}
          {errorMessage} 
      { this.props.currentFormSection === "arrangement" ?             
        <ul>
          <li><h4>CHOOSE THE ARRANGEMENT TYPE</h4></li>
          <li className="arrangement"> 
            <div>         
              <div className="thumb">
                <img className="thumbnail" src="../img/flowers.jpg" alt=""/> 
              </div>
              <div className="flowerChoice form-input"> 
                <h5 className="arrangementName">Designer's Lobby Arrangement</h5>           
                <button className="arrangeButton" onClick={() => dispatchArrangement('3')}  type="button">SELECT</button>            
              </div>
            </div>
          </li>
          <li className="arrangement">          
            <div className="thumb">
              <img className="thumbnail" src="../img/flowers.jpg" alt=""/> 
            </div>
            <div className="flowerChoice form-input">            
            <h5 className="arrangementName">Designer's Choice Arrangement</h5>           
                <button className="arrangeButton" onClick={() => dispatchArrangement('2')}  type="button">SELECT</button>             
            </div>
          </li>
          <li className="arrangement">          
            <div className="thumb">
              <img className="thumbnail" src="../img/flowers.jpg" alt=""/> 
            </div>
            <div className="flowerChoice form-input">            
            <h5 className="arrangementName">Designer's Bouquet</h5>           
                <button className="arrangeButton" onClick={() => dispatchArrangement('1')}  type="button">SELECT</button>             
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
            <h4 className="frequency">FREQUENCY: {this.props.currentFrequency}</h4>

          </li>
            
          <li>
            <div className="frequency form-input">
              <button onClick={() => dispatchFrequency("monthly")}  type="button">monthly</button>
            </div>
          </li>
          <li>
            <div className="frequency form-input">
              <button onClick={() => dispatchFrequency("weekly")}  type="button">weekly</button>
            </div>
          </li>
          <li>
            <div className="frequency form-input">
              <button onClick={() => dispatchFrequency("bi-weekly")}  type="button">bi-weekly</button>
            </div>
          </li>
          <li>
            <h4 className="duration">DURATION: {this.props.currentDuration}</h4>
          </li>
          <li>
            <div className="duration form-input">
              <button onClick={() => dispatchDuration("3 months")}  type="button">3 months</button>
            </div>
          </li>
          <li>
            <div className="duration form-input">
              <button onClick={() => dispatchDuration("6 months")}  type="button">6 months</button>
            </div>
          </li>
          <li>
            <div className="duration form-input">
              <button onClick={() => dispatchDuration("12 months")}  type="button">12 months</button>
            </div>
          </li>
          <li>
            <div className="duration form-input">
              <button onClick={() => dispatchDuration("on-going")}  type="button">on-going</button>
            </div>
          </li>
          <li>
          {formButton}
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
          <li>
          {formButton}
          </li>
        </ul> 
      : ""  }  
      { this.props.currentFormSection === "receiver" ?   
      <div>
        <FieldArray name="recipients" component={renderRecipients}/>
      </div>

      : ""  }


      </form> 
      </div>
    )
  }
}   
const mapStateToProps = state => ({
  currentFormSection: state.subscription.currentFormSection,
  currentNumberOfDeliveries: state.subscription.currentNumberOfDeliveries,
  currentProductCode: state.subscription.currentProductCode,
  currentFrequency: state.subscription.currentFrequency,
  currentDuration: state.subscription.currentDuration,
  //duration: selector(state.SubscriptionAddForm.duration, 'duration'),
  //choice: selector(state.SubscriptionAddForm.choice, 'choice')
})

//console.log('frequency: ', frequency, ' | duration: ', duration, ' | choice: ', choice );
  const mapDispatchToProps = dispatch => {
    return {
      jumpToSection: () => {
        dispatch(jumpToSection())
      },
      setNumberOfDeliveries: () => {
        dispatch(setNumberOfDeliveries())
      },
      setProductChoice: () => {
        dispatch(setProductChoice())
      },
      setFrequency: () => {
        dispatch(setFrequency())
      },
      setDuration: () => {
        dispatch(setDuration())
      }
      
    }
  };
 

SubscriptionAddForm = connect(mapStateToProps, mapDispatchToProps)(SubscriptionAddForm)

export default reduxForm({
  form: 'subscriptionAddForm'
})(SubscriptionAddForm); 
