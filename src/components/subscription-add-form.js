import React from 'react';
import {Field, SubmissionError, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Input from './input';
import {required, nonEmpty} from '../validators';
import './subscription-add-form.css'; 
import { jumpToSection, setNumberOfDeliveries, setProductChoice, setFrequency, setDuration, setDeliveryDate } from '../actions';
import {REACT_APP_BASE_URL} from '../config';
export class SubscriptionAddForm extends React.Component {
  //POST section starts here
  onSubmit(values) {
    values['productCode'] = this.props.currentProductCode;
    if (this.props.currentProductCode === '1') {
      values['productName'] = "Designer's Bouquet";
    } else {
      if (this.props.currentProductCode === '2') {
        values['productName'] = "Designer's Choice Arrangement";
      } else {
        if (this.props.currentProductCode === '3') {
          values['productName'] = "Designer's Lobby Arrangement";
        }
      }
    }
    values['frequency'] = this.props.currentFrequency;
    values['duration'] = this.props.currentDuration;
    return fetch(`${REACT_APP_BASE_URL}/api/subscriptions`, {
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
      this.props.dispatch(jumpToSection('confirm'));
      return res.json();
    })
    .then((values) => {
      this.props.dispatch(setDeliveryDate(values.startDate))})
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
      let numberOfDeliveries; 
      let subscriptionTerm;
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
      this.props.dispatch(setNumberOfDeliveries(numberOfDeliveries));
      
    }
    

    //  custom button for each section
    formButton = ( <button onClick={() => console.log('state: ', this.props)}  type="button">NEXT</button>); 
    switch (this.props.currentFormSection) {
      case 'schedule':
        formButton = ( <button className="jump" onClick={() => { dispatchFrequency(this.props.currentValues.frequency);  dispatchDuration(this.props.currentValues.duration); dispatchNumberOfDeliveries()}}  type="button">NEXT</button>); 
        break;
      case 'recipient':
        formButton = (<button className="jump"  onClick={() => this.props.dispatch(jumpToSection('sender'))}  type="button">NEXT</button>);
        break;
        case 'sender':
        formButton = (<button className="jump"  onClick={() => this.props.dispatch(jumpToSection('schedule'))}  type="button">NEXT</button>);
        break;
      case 'receiver':
        formButton = (<button  className="jump" type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button>);
        break;
      case 'checkout':
        formButton = (<button  className="jump" type="submit" disabled={this.props.pristine || this.props.submitting}>SUBSCRIBE!</button>);
        break;
      case 'confirm':
        formButton = ( <button className="jump"  onClick={() => this.props.dispatch(jumpToSection('arrangement'))}  type="button">Finish</button>); 
        break;
      case 'onboarding':
        formButton = ( <button className="jump"  onClick={() => this.props.dispatch(jumpToSection('arrangement'))}  type="button">Get Started</button>); 
        break;
      default:
        formButton = ( <button className="jump"  onClick={() => this.props.dispatch(jumpToSection('arrangement'))}  type="button">Finish</button>); 
      break;
    }   
// GET Today's DATE
      let today = new Date();
      let dd = today.getDate()+1;
      let mm = today.getMonth()+1; //January is 0!
      let yyyy = today.getFullYear();
      
      if(dd<10) {
          dd = '0'+dd
      } 
      
      if(mm<10) {
          mm = '0'+mm
      } 
      
    const deliveryDate = mm + '/' + dd + '/' + yyyy;
    const deliveryCharge = 20;
    //SET THE PRODUCT NAME
    const theForm = this.props.currentValues;
    const thisProductName = pCode => {
      if (pCode === '1') {
        return "Designer's Bouquet";
      } else {
        if (pCode === '2') {
          return "Designer's Choice Arrangement";
        } else {
          if (pCode === '3') {
            return "Designer's Lobby Arrangement";
          }
        }  
      }
    }

  //SET THE PRODUCT PRICE
    const thisPrice = pCode => {
      if (pCode === '1') {
        return "35";
      } else {
        if (pCode === '2') {
          return "65";
        } else {
          if (pCode === '3') {
            return "125";
          }
        }  
      }
    }

    return (
      <div>
        <header role="heading">
          <h1>BLOOMS SUBSCRIPTIONS</h1>
        </header>
        <main role="main">
          <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            {successMessage}
            {errorMessage} 
            { this.props.currentFormSection === "onboarding" ?   
            <div>
              <nav role="menu">
              </nav>
              <section>
              <div className="landing">
                <h2>Welcome to Blooms Subscription Service!</h2> 
                <p>Blooms provides an easy way to brighten up and beautify your home or office on a regular basis.</p>
                <p>We will deliver beautiful, fresh, custom flower arrangements straight to your home or office on a regular schedule!</p>
                <p>All you need to do is set your flower preferences and delivery details, and that’s it!</p>
                <p>Click the button, and we'll get you set up right away!!</p>
                <div className="entry">{formButton}</div>
              </div>
              </section>
            </div>                
            : ""  }

            { this.props.currentFormSection === "arrangement" ?             
            <ul className="arrangements">
              <li>
                <h4>CHOOSE THE ARRANGEMENT TYPE!</h4>
              </li>
              <li className="arrangement">
                <div className="arrangement3">         
                  <div className="thumb">
                      <img className="thumbnail"  onClick={() => dispatchArrangement('3')} src="../img/_DSC3098.png" alt=""/>
                  </div>                                   
                  <div className="pickArr3">
                    <p className="arrangementName ">{thisProductName('3')}</p>
                    <button className="arrangeButton" onClick={() => dispatchArrangement('3')}  type="button">SELECT</button><span className="price"></span>                 
                  </div>
                </div>
              </li>
              <li className="arrangement"> 
              <div className="arrangement2">          
                <div className="thumb">
                  <img className="thumbnail"  onClick={() => dispatchArrangement('2')} src="../img/_DSC2980.png" alt=""/>                  
                </div>
                <div className="pickArr2">
                  <p className="arrangementName">{thisProductName('2')}</p>
                  <button className="arrangeButton" onClick={() => dispatchArrangement('2')}  type="button">SELECT</button><span className="price"></span> 
                </div>
                </div>
              </li>
              <li className="arrangement">     
                <div className="arrangement1">   
                  <div className="thumb">
                    <img className="thumbnail" onClick={() => dispatchArrangement('1')} src="../img/_DSC3345.png" alt=""/>                 
                  </div>
                  <div className="pickArr1">
                    <p className="arrangementName">{thisProductName('1')}</p>
                    <button className="arrangeButton" onClick={() => dispatchArrangement('1')}  type="button">SELECT</button><span className="price"></span>  
                  </div>
                </div>
              </li>
            </ul>
        : "" }
        { this.props.currentFormSection === "recipient" ?             
            <ul className="recipientInfo">
              <li>         
                <div className="orderSummary">
                  <h5>Order Details</h5>
                  <p className="recipient productName">PRODUCT: {thisProductName(this.props.currentProductCode)}</p>
                  <p className="recipient productPrice">PRICE: ${thisPrice(this.props.currentProductCode)}</p>
                  <p className="recipient productPrice">Delivery: $20</p>                 
                </div>
              </li>
              <li>
                <h4>PLEASE ENTER RECIPIENT INFO</h4>
              </li>
              <li>            
                <div className="form-input recipientInfoFields1 span6">             
                  <label htmlFor="recipientFirstName" className="recipientFirstName">
                    <Field
                      name="recipientFirstName"
                      type="text"
                      component={Input}
                      placeholder="FIRST NAME"
                      validate={[required, nonEmpty]}
                    />
                  </label>
                  <label htmlFor="recipientLastName" className="recipientLastName">                           
                    <Field
                      name="recipientLastName"
                      type="text"
                      component={Input}
                      placeholder="LAST NAME" 
                      validate={[required, nonEmpty]}
                    />
                  </label>                            
                  <label htmlFor="recipientCompany" className="recipientCompany">                           
                    <Field
                      name="recipientCompany"
                      type="text"
                      component={Input}
                      placeholder="COMPANY" 
                    />
                  </label>                            
                  <label htmlFor="recipientAddress" className="recipientAddress">                            
                    <Field
                      name="recipientAddress"
                      type="text"
                      component={Input}
                      placeholder="STREET ADDRESS" 
                      validate={[required, nonEmpty]}
                    />
                  </label>                            
                  <label htmlFor="RecipientAptSuite" className="RecipientAptSuite">                            
                    <Field
                      name="RecipientAptSuite"
                      type="text"
                      component={Input}
                      placeholder="APT /SUITE"
                    />
                  </label>                                    
                  <label htmlFor="recipientCity" className="recipientCity">                            
                    <Field
                      name="recipientCity"
                      type="text"
                      component={Input}
                      placeholder="CITY"
                      validate={[required, nonEmpty]}
                    />
                  </label>                            
                  <label htmlFor=">recipientState" className="recipientState">                            
                    <Field
                      name="recipientState"
                      type="text"
                      component={Input}
                      placeholder="STATE"
                      validate={[required, nonEmpty]}
                    />
                  </label>                            
                  <label htmlFor="recipientZipcode" className="recipientZipcode">                          
                    <Field
                      name="recipientZipcode"
                      type="text"
                      component={Input}
                      placeholder="ZIP CODE"
                      validate={[required, nonEmpty]}
                    />
                  </label>             
                  <label htmlFor="recipientPhone" className="recipientPhone">                           
                    <Field
                      name="recipientPhone"
                      type="text"
                      component={Input}
                      placeholder="CELL PHONE"
                      validate={[required, nonEmpty]}
                    />
                  </label>             
                  <label htmlFor="recipientMessage" className="recipientMessage">Write a message</label>                              
                    <Field
                      name="recipientMessage"
                      type="textarea"
                      rows="4" 
                      cols="50"
                      component={Input}
                      placeholder="Why are you sending?"
                    />                    
                </div>
                <div className="formButton recipientData">
                  {formButton}
                </div>
              </li>
            </ul>
        : ""  }
        { this.props.currentFormSection === "sender" ?   
            <ul className="senderData">
              <li>         
                <div className="orderSummary">
                  <h5>Order Details</h5>
                  <p className="recipient productName">PRODUCT: {thisProductName(this.props.currentProductCode)}</p>
                  <p className="recipient productPrice">PRICE: ${thisPrice(this.props.currentProductCode)}</p>
                  <p className="recipient productPrice">Delivery: $20</p>                 
                  <p className="recipient productPrice">TOTAL: ${+deliveryCharge + +thisPrice(this.props.currentProductCode)}</p>                  
                </div>
              </li>
              <li>                
                <div className="senderInfo">
                <h4>PLEASE ENTER SENDER INFORMATION</h4>
                  <label htmlFor="senderEmail" className="senderEmail"/>                     
                    <Field
                      name="senderEmail"
                      type="email"
                      component={Input}
                      placeholder="EMAIL"
                      validate={[required, nonEmpty]}
                    />
                                              
                  <label htmlFor="senderFirstName" className="senderFirstName" />
                    <Field
                      placeholder="FIRST NAME" 
                      name="senderFirstName" 
                      type="text"
                      component={Input}
                      validate={[required, nonEmpty]}
                      
                    />
                  
                  <label htmlFor="senderLastName" className="senderLastName" />                            
                    <Field
                      name="senderLastName"
                      placeholder="LAST NAME" 
                      type="text"
                      component={Input}
                      validate={[required, nonEmpty]}
                      
                    />
                                            
                  <label htmlFor="senderPhone" className="senderPhone" />                        
                    <Field
                      name="senderPhone"
                      type="text"
                      component={Input}
                      placeholder="PHONE"  
                      validate={[required, nonEmpty]}
                    />                                      
                </div>

              </li>


              <li>
              <div className="formbutton">
                  {formButton}
                </div>
              </li>
            </ul>  

        : ""  }  
        { this.props.currentFormSection === "schedule" ?  
          
            <ul className="scheduleInfo">
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
                      <p className="recipient productName">PRODUCT: {thisProductName(this.props.currentProductCode)}</p>
                      <p className="recipient productPrice">PRICE: ${thisPrice(this.props.currentProductCode)}</p>
                      <p className="recipient productPrice">Delivery: $20</p>                 
                      <p className="recipient productPrice">TOTAL: ${+deliveryCharge + +thisPrice(this.props.currentProductCode)}</p> 
                      <p className="sender deliveryDate"> START DELIVERY ON: {deliveryDate}</p>                   
                    </div>
                    <div className="leftSide">
                      <div className="checkout span6">
                        <h5>Frequency</h5>
                        <Field name="frequency" component="select">
                          <option>How Often</option>
                          <option value="monthly">monthly</option>
                          <option value="bi-weekly">bi-weekly</option>
                          <option value="weekly">weekly</option>
                          validate={[required, nonEmpty]}
                        </Field>
                      </div>
                    </div>    
                    <div className="rightSide">
                      <div className="checkout span6">
                        <h5>Duration</h5>
                        <Field name="duration" component="select">
                          <option>How Long</option>
                          <option value="3 months">3 months</option>
                          <option value="6 months">6 months</option>
                          <option value="12 months">12 months</option>
                          <option value="ongoing">ongoing</option>
                          validate={[required, nonEmpty]}
                        </Field>
                      </div>                  
                    </div>  
                  </div>
                </li>
                <li className="datePicking">
                  <h4>Choose Delivery Start Date</h4>
                  <Field
                    name="startDate"
                    type="date"
                    component={Input}
                    validate={[required, nonEmpty]}
                  />
                </li>    
                <li>
                  {formButton}
                </li>
              </ul>
            </div>
          </li>
        </ul> 
          
        : ""  }  
        { this.props.currentFormSection === "checkout" ?   
          <div className="checkout">
            <main>
              <header>
                <h4>Here's your subscription details!</h4>
              </header>
              <section>
                <div className="checkoutSum">              
                  <div className="orderSummary">
                    <h5>Order Details</h5>
                    <p className="recipient productName">PRODUCT: {thisProductName(this.props.currentProductCode)}</p>
                    <p className="recipient productPrice">PRICE: ${thisPrice(this.props.currentProductCode)}</p>
                    <p className="recipient productPrice">Delivery: $20</p>                 
                    <p className="recipient productPrice">TOTAL: ${+deliveryCharge + +thisPrice(this.props.currentProductCode)}</p> 
                    <p className="sender deliveryDate"> START DELIVERY ON: {deliveryDate}</p>                   
                  </div>
                  <div className="leftSide">
                    <div className="senderBlock">
                      <h5>Sender Info</h5>
                      <p className="sender name">NAME: {theForm.senderFirstName} {theForm.senderLastName}</p>
                      <p className="sender email">EMAIL: {theForm.senderEmail}</p>
                      <p className="sender phone">PHONE: {theForm.senderPhone}</p>      
                    </div>
                  </div>    
                  <div className="rightSide">
                    <div className="receiverBlock">
                      <h5>Recipient Info</h5>
                      <p className="recipient name">NAME: {theForm.recipientFirstName} {theForm.recipientLastName}</p>
                      <p className="recipient company">COMPANY: {theForm.recipientCompany} {theForm.recipientCompany}</p>
                      <p className="recipient phone">PHONE: {theForm.recipientPhone}</p>
                      <p className="recipient streetAddress">STREET ADDRESS: {theForm.recipientAddress}</p>
                      <p className="recipient aptSuite">APT/SUITE: {theForm.recipientAptSuite}</p>
                      <p className="recipient cityStateZip">CITY, STATE, ZIPCODE: {theForm.recipientCity} {theForm.recipientState} {theForm.recipientZipcode}</p>
                      <p className="recipient message">GIFT MESSAGE: {theForm.recipientMessage}</p>
                    </div>                  
                  </div>  
                  </div>
                <div className="checkoutButton">{formButton}</div>
              </section>        
            </main>
          </div>
        : ""  }
        { this.props.currentFormSection === "confirm" ?   
          <div className="confirm">
            <main>
              <h2>Thank You!</h2>
              <p className="byebye">Your order will be delivered {this.props.currentDeliveryDate}.</p>              
            </main>
          </div>
        : ""  }
      </form> 
    </main>
  </div>
    )
  }
}   
const mapStateToProps = state => {
  const form = state.form.subscriptionAddForm || {values:{}};
  const values = form.values || {};
  return ({
  currentFormSection: state.subscription.currentFormSection,
  currentNumberOfDeliveries: state.subscription.currentNumberOfDeliveries,
  currentProductCode: state.subscription.currentProductCode,
  currentFrequency: state.subscription.currentFrequency,
  currentDuration: state.subscription.currentDuration,
  currentValues: values,
  currentDeliveryDate: state.subscription.currentDeliveryDate.substring(0, 10)
})}

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
