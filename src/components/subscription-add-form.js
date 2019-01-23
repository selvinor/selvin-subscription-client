import React, { Fragment } from 'react';
import {Field, SubmissionError, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Input from './input';
import {required, nonEmpty} from '../validators';
import './styles/subscription-add-form.css'; 
import './styles/recipient-block.css'; 
import { setSection, setNumberOfDeliveries, setProductChoice, setFrequency, setDuration, setDeliveryDate } from '../actions';
import {API_BASE_URL} from '../config';

export class SubscriptionAddForm extends React.Component {
  componentDidMount() {
    // console.log('product is: ', this.props.match.params);
    if(!this.props.current.productCode) {
      
      this.props.setProductChoice(this.props.match.params.pCode);
    }
  } 

  //POST section starts here
  onSubmit(values) {
    values['productCode'] = this.props.current.productCode;
    values['productName'] = this.props.current.productName;
    values['frequency'] = this.props.current.frequency;
    values['duration'] = this.props.current.duration;
    values['userId'] = this.props.currentUser._id;
console.log('submitted values: ', values);
    // return fetch(`${API_BASE_URL}/protected/subscriptions`, {
    return fetch(`${API_BASE_URL}/api/subscriptions`, {
      method:'POST',
      body: JSON.stringify(values),
      headers: {
        // 'Content-Type': 'application/json',
        // Authorization: `Bearer ${authToken}`
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
      this.props.dispatch(setSection('confirm'));
      return res.json();
    })
    .then((values) => {
      console.log('values: ', values)})
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
    // console.log('subscriptionAdd has these props at start: ', this.props);
    if (this.props.submitSucceeded) {
      successMessage = (
        <div className= "message message-success">
          Your Blooms subscription has been activated!
        </div>
      );
    }
  
    let errorMessage;
    if (this.props.error) {
      errorMessage = (
        <div className="message message-error">{this.props.error}</div>
      );
    }



    const setProductChoice = (choice) => {
      this.props.dispatch(setProductChoice(choice)) ;
    }
    // const dispatchFrequency = (frequency) => {
    //   this.props.dispatch(setFrequency(frequency));
    // }    
    // const dispatchDuration = (duration) => {
    //   this.props.dispatch(setDuration(duration)) ;
    // }        
    const dispatchSection = (section) => {
      this.props.dispatch(setSection(section)) ;
    }        
    const dispatchStartDate = (begin) => {
      this.props.dispatch(setDeliveryDate(begin)) ;
    }        
    const dispatchNumberOfDeliveries = () => {
      let numberOfDeliveries; 
      let subscriptionTerm;
      switch (this.props.current.duration) {
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
      switch (this.props.current.frequency) {
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
      setNumberOfDeliveries(numberOfDeliveries);       
    }
    
  // const validateEmail =function (email) {
  //     var re = /\S+@\S+/;
  //     return re.test(email);
  // }
  const firstAvailableDate = function() {
    const today = new Date();
    const dayOfWeek = today.setDate(today.getDate() + 7);
    if (dayOfWeek === 6) {
      today.setDate(today.getDate() + 2);
    } else {
      if (dayOfWeek === 7) {
      today.setDate(today.getDate() + 1);        
      }
    }
    return today.toISOString().substring(0,10);
  }
  
  const validateFields = function(section){
    let fieldsToCheck;
    let destination;
    let formSection;
console.log('validating');
    switch (section) {
      case 'recipient-page':
        fieldsToCheck = [0,1,3,5,6,7,8];
        destination = 'schedule';
        formSection = 'recipient-page';
      break;
      case 'schedule':
        dispatchStartDate(firstAvailableDate());
        
        // dispatchDuration();
        // dispatchFrequency();
        // dispatchNumberOfDeliveries();
        fieldsToCheck = [0,1,2];
        destination = 'checkout';
        formSection = 'scheduleInfo';
      break;
      default:
        fieldsToCheck = [0,1,3,5,6,7,8];
        destination = 'sender';
        formSection = 'recipient-page';
      break;
    }  
    const check = document.getElementById(formSection).getElementsByTagName("input");
    let len = check.length;
    let badFieldCount = 0;
    let badFields = [];


    
    for(let  i=0; i<len; i++) {  
      switch (section) {
        case 'recipient':
          if (check[i].value === '' && fieldsToCheck.includes(i)) {
            badFieldCount++;
            badFields.push(i);
            check[i].placeholder = check[i].name.substring(9) + " is required";
          }
          break;
        case 'schedule':   
        if (check[i].name === 'startDate') {
          if (check[i].value < check[i].min) {
            badFieldCount++;
            badFields.push(i);
            check[i].value = check[i].min
            document.getElementById('deliveryMsg').innerText = 'First available date:';
            dispatchNumberOfDeliveries();
          }
        }
            dispatchNumberOfDeliveries();
          if (check[i].value === '') {
            badFieldCount++;
            badFields.push(i);
            document.getElementById('startDate').value = document.getElementById('startDate').min;
            document.getElementById('deliveryMsg').innerText = 'First available date:';
            check[i].placeholder = check[i].name + " is required";
          } 
          break;
        default:
          break;
      }   
    }    
    if (badFieldCount === 0 ) {
      dispatchSection(destination);
    }  else {
      badFieldCount = 0;
    }    
  };
   //  custom button for each section
  formButton = ( <button onClick={() => console.log('state: ', this.props)}  type="button">NEXT</button>); 
  switch (this.props.current.formSection) {
    case 'schedule':
      formButton = ( <button className="jump" onClick={() => validateFields('schedule')}  type="button">NEXT</button>); 
      break;
    case 'recipient':
      formButton = (<button className="jump formButton"  onClick={() => validateFields('recipient-page')}  type="button">NEXT</button>);
      break;
    case 'checkout':
      formButton = (<button  className="jump" type="submit" disabled={this.props.pristine || this.props.submitting}>SUBSCRIBE!</button>);
      break;
    case 'confirm':
      formButton = ( <button className="jump"  onClick={() => dispatchSection('product')}  type="button">Finish</button>); 
      break;
    default:
      formButton = ( <button className="jump"  onClick={() => dispatchSection('product')}  type="button">Finish</button>); 
    break;
  }   

   // const deliveryDate = mm + '/' + dd + '/' + yyyy;
    const deliveryCharge = 20;
    //SET THE PRODUCT NAME
    let deliveryMsg = '';

    return (
    <Fragment>
      <main role="main" className="recipient-main">
      <Link to={`/`} >
        <div className="logo"></div>
      </Link>

        <section id="subscription-form">
          <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            {successMessage}
            {errorMessage} 
        { this.props.current.formSection === "recipient" ?             
              <div id="recipient-page">
              <div className="recipient-button">
                <button className="jumpBack" type="button"> <Link style={{display: 'block', height: '100%'}} to={`/products/${this.props.current.productCode}`} >BACK</Link></button>            
              </div>
              <div className="recipient-orderSummary">
                <h5>Order Details</h5>
                <p className="recipient-productName"><span className="bold">Product:</span> {this.props.current.productName}</p>
                <p className="recipient-productPrice"></p>
                <p className="recipient-productName"><span className="bold">Price:</span> ${this.props.current.productPrice}</p>
              </div>
              <ul className="recipients-info">
              <li>
                <h5>PLEASE ENTER RECIPIENT INFO:</h5>
              </li>
              <li>            
                <div className="form-input recipientInfoFields1">             
                  <label htmlFor="recipientFirstName" className="recipientFirstName">FIRST NAME
                    <Field
                      name="recipientFirstName"
                      type="text"
                      component={Input}
                      placeholder="Required"
                      validate={[required, nonEmpty]}
                    />
                  </label>
                  <label htmlFor="recipientLastName" className="recipientLastName">LAST NAME                           
                    <Field
                      name="recipientLastName"
                      type="text"
                      component={Input}
                      placeholder="Required" 
                      validate={[required, nonEmpty]}
                    />
                  </label>                            
                  <label htmlFor="recipientCompany" className="recipientCompany">COMPANY                           
                    <Field
                      name="recipientCompany"
                      type="text"
                      component={Input}
                      placeholder="" 
                    />
                  </label>                            
                  <label htmlFor="recipientAddress" className="recipientAddress">STREET ADDRESS                            
                    <Field
                      name="recipientAddress"
                      type="text"
                      component={Input}
                      placeholder="Required" 
                      validate={[required, nonEmpty]}
                    />
                  </label>                            
                  <label htmlFor="recipientAptSuite" className="recipientAptSuite">APT /SUITE                            
                    <Field
                      name="recipientAptSuite"
                      type="text"
                      component={Input}
                      placeholder=""
                    />
                  </label>                                    
                  <label htmlFor="recipientCity" className="recipientCity">CITY                            
                    <Field
                      name="recipientCity"
                      type="text"
                      component={Input}
                      placeholder="Required"
                      validate={[required, nonEmpty]}
                    />
                  </label>                            
                  <label htmlFor=">recipientState" className="recipientState">STATE                            
                    <Field
                      name="recipientState"
                      type="text"
                      component={Input}
                      placeholder="Required"
                      validate={[required, nonEmpty]}
                    />
                  </label>                            
                  <label htmlFor="recipientZipcode" className="recipientZipcode">ZIP CODE                          
                    <Field
                      name="recipientZipcode"
                      type="text"
                      component={Input}
                      placeholder="Required"
                      validate={[required, nonEmpty]}
                    />
                  </label>             
                  <label htmlFor="recipientPhone" className="recipientPhone">CELL PHONE                           
                    <Field
                      name="recipientPhone"
                      type="text"
                      component={Input}
                      placeholder="Required"
                      validate={[required, nonEmpty]}
                    />
                  </label>             
                  <label htmlFor="recipientMessage" className="recipientMessage">MESSAGE                              
                    <Field
                      name="recipientMessage"
                      type="textarea"
                      rows="4" 
                      cols="50"
                      component={Input}
                      placeholder="Why are you sending?"
                    /> 
                  </label>                    
                </div>
                <div className="recipientData">
                  <button className="formButton jump"  onClick={() => validateFields('recipient-page')}  type="button">NEXT</button>
                </div>
              </li>
            </ul>
            </div>
        : ""  } 
        { this.props.current.formSection === "schedule" ? 
        <Fragment>
        <button className="jumpBack"  onClick={() => dispatchSection('recipient')}  type="button">BACK</button> 
     
        <ul id="scheduleInfo">
          <li>                          
            <div className="scheduleBlock">
              <ul>
                <li className="schedule">
                  <h3>SCHEDULE DELIVERY</h3> 
                </li>
                <li>
                  <div className="scheduleFormFields">              
                    <div className="orderSummary">
                      <h5>Order Details</h5>
                      <p className="recipient productName">Product: {this.props.current.productName}</p>
                      <p className="recipient productPrice">Price: ${this.props.current.productPrice}</p>
                      <p className="recipient productPrice">Delivery: $20</p>                 
                      <p className="recipient productPrice">Total: ${+deliveryCharge + +this.props.current.productPrice}</p>               
                    </div>
                    <div className="leftSide schedule">

                        <h5>Frequency</h5>
                        <Field name="frequency" id="frequency" component="select">
                          <option key="monthly" value="monthly">monthly</option>
                          <option key="bi-weekly" value="bi-weekly">bi-weekly</option>
                          <option key="weekly" value="weekly">weekly</option>
                        </Field>

                    </div>    
                    <div className="rightSide schedule">

                        <h5>Duration</h5>
                        <Field name="duration" id="duration" component="select">
                          <option key="3 months" value="3 months">3 months</option>
                          <option key="6 months" value="6 months">6 months</option>
                          <option key="12 months" value="12 months">12 months</option>
                          <option key="ongoing" value="ongoing">ongoing</option>
                        </Field>
                 
                    </div>  
                  </div>
                </li>
                <li className="datePicking">
                  <h4>Choose Delivery Start Date</h4>
                  <p id="deliveryMsg">{deliveryMsg}</p>
                  <Field
                    name="startDate"
                    type="date"
                    min={firstAvailableDate()}
                    component={Input}
                    value={firstAvailableDate}
                  />
                </li>    
                <li>
                <button className="jump" onClick={() => {
                  this.props.dispatch(setDeliveryDate(firstAvailableDate()));
                  validateFields('schedule');}}  type="button">NEXT</button>
                </li>
              </ul>
            </div>
          </li>
        </ul> 
        </Fragment> 
        : ""  }  
        { this.props.current.formSection === "checkout" ? 
        <Fragment>      
          <span>{console.log('checkout : ', this.props)}</span>         
          <button className="jumpBack"  onClick={() => dispatchSection('schedule')}  type="button">BACK</button>              
          <h4>If everything looks good, please click the 'subscribe' button to start your subscription!</h4>
          <div className="checkout">
            <section className="checkoutSummary">
              <div className="orderBlock">
                  <h5>Order Details</h5>
                  <p className="order productName"><span className="bold">Product:</span> {this.props.current.productName}</p>
                  <p className="order productPrice"><span className="bold">Price:</span> {this.props.current.productPrice}</p>
                  <p className="order delivery"><span className="bold">Delivery: </span>$20</p>                 
                  <p className="order total"><span className="bold">Total: </span>${+deliveryCharge + +this.props.current.productPrice}</p>                 
                </div>
                <div className="senderBlock">
                  <h5>Sender Info</h5>
                  <p className="sender name"><span className="bold">NAME: </span>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</p>
                  <p className="sender senderEmail"><span className="bold">EMAIL: </span>{this.props.currentUser.email}</p>
                  <p className="sender phone"><span className="bold">PHONE: </span>{this.props.currentUser.phone}</p>  
                  <p className="recipient-message"><span className="bold">GIFT MESSAGE: </span>{this.props.currentValues.recipientMessage}</p>    
                </div>  
                <div className="receiverBlock">
                  <h5>Recipient Info</h5>
                  <p className="recipient name"><span className="bold">NAME: </span>{this.props.currentValues.recipientFirstName} {this.props.currentValues.recipientLastName}</p>
                  <p className="recipient company"><span className="bold">COMPANY: </span>{this.props.currentValues.recipientCompany} </p>
                  <p className="recipient phone"><span className="bold">PHONE: </span>{this.props.currentValues.recipientPhone}</p>
                  <p className="recipient streetAddress"><span className="bold">STREET ADDRESS: </span>{this.props.currentValues.recipientAddress}</p>
                  <p className="recipient aptSuite"><span className="bold">APT/SUITE: </span>{this.props.currentValues.recipientAptSuite}</p>
                  <p className="recipient cityStateZip"><span className="bold">CITY, STATE, ZIPCODE:                     
                    </span>{this.props.currentValues.recipientCity} {this.props.currentValues.recipientState} {this.props.currentValues.recipientZipcode}
                  </p>
                </div>    
                <div className="checkoutButton">{formButton}</div>              
              </section>        
          </div>

        </Fragment> 
        : ""  }
        { this.props.current.formSection === "confirm" ?   
          <div className="confirm">
              <h2>Thank You!</h2>
              <p className="byebye">Your order will be delivered {this.props.current.deliveryDate}.</p>               
            <div className="confirmButton"><button className="jumpBack" type="button"> <Link style={{display: 'block', height: '100%'}} to={`/products`} >Finish</Link></button> </div>
                       

          </div>
        : ""  }
      </form> 
    </section>
  </main>
</Fragment>
    )
  }
}   
const mapStateToProps = state => {
  const form = state.form.subscriptionAddForm || {values:{}};
  const values = form.values || {};
  return ({
  hasAuthToken: state.auth.authToken !== null,
  currentUser: state.auth.currentUser,
  current:  state.subscription,
  currentValues: values
})}

  const mapDispatchToProps = dispatch => {
    return {
      // fetchProtectedData: () => {
      //   dispatch(fetchProtectedData())
      // },
      setSection: () => {
        dispatch(setSection())
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
      },
      setDeliveryDate: () => {
        dispatch(setDeliveryDate())
      }
      
    }
  };
 

SubscriptionAddForm = connect(mapStateToProps, mapDispatchToProps)(SubscriptionAddForm)

export default reduxForm({
  form: 'subscriptionAddForm'
})(SubscriptionAddForm); 
