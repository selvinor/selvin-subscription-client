import React from 'react';
import {Field, SubmissionError, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Input from './input';
//import {required, pristine, submitting} from '../validators';
import './subscription-add-form.css'; 
import { jumpToSection, setNumberOfDeliveries, setProductChoice, setFrequency, setDuration, setDeliveryDate } from '../actions';

export class SubscriptionAddForm extends React.Component {
  //POST section starts here
  onSubmit(values) {
    console.log('this.props.currentProductCode: ', this.props.currentProductCode);
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
    console.log('values" ', values);
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
      this.props.dispatch(jumpToSection('confirm'));
      return res.json();
    })
    .then((values) => {
      console.log('please work ', values);
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

  //POST section ends here
  //GET section starts here

  //GET section ends here
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
    

    // CONTROL FLOW BY Setting custom button for each section
    formButton = ( <button onClick={() => console.log('state: ', this.props)}  type="button">Schedule it</button>); 
    switch (this.props.currentFormSection) {
      case 'schedule':
        formButton = ( <button className="jump" onClick={() => {console.log('this.props: ', this.props); dispatchFrequency(this.props.currentValues.frequency);  dispatchDuration(this.props.currentValues.duration); dispatchNumberOfDeliveries()}}  type="button">NEXT</button>); 
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
    console.log('today is: ', today);
    console.log('this.props: ', this.props);
    console.log('this.props.currentSubEmail ',this.props.currentSubEmail);
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
            <div className="confirm">
              <nav role="menu">
              </nav>
              <section>
                <h2>Welcome to Blooms Subscription Service!</h2> 
                <p>Blooms provides an easy way to brighten up and beautify your home or office on a regular basis.</p>
                <p>We will deliver beautiful, fresh, custom flower arrangements straight to your home or office on a regular schedule!</p>
                <p>All you need to do is set your flower preferences and delivery details, and that’s it!</p>
                <p>Click the button, and we'll get you set up right away!</p>
              </section>
              <section>
                <div className="entry">{formButton}</div>
              </section>
            </div>                
            : ""  }

            { this.props.currentFormSection === "arrangement" ?             
            <ul className="arrangements">
              <li>
                <h4>CHOOSE THE ARRANGEMENT TYPE</h4>
              </li>
              <li className="arrangement3">         
                <div className="thumb">
                    <img className="thumbnail" src="../img/_DSC3098.png" alt=""/>
                </div>                                   
                <div className="selectArr">
                  <p className="arrangementName ">{thisProductName('3')}</p>
                  <button className="arrangeButton" onClick={() => dispatchArrangement('3')}  type="button">SELECT</button><span className="price"> ${thisPrice('3')}</span>                 
                </div>
              </li>
              <li className="arrangement2">         
                <div className="thumb">
                  <img className="thumbnail" src="../img/_DSC2980.png" alt=""/>                  
                </div>
                <div className="selectArr">
                  <p className="arrangementName">{thisProductName('2')}</p>
                  <button className="arrangeButton" onClick={() => dispatchArrangement('2')}  type="button">SELECT</button><span className="price"> ${thisPrice('2')}</span> 
                </div>
              </li>
              <li className="arrangement1">         
                <div className="thumb">
                  <img className="thumbnail" src="../img/_DSC3345.png" alt=""/>                 
                </div>
                <div className="selectArr">
                  <p className="arrangementName">{thisProductName('1')}</p>
                  <button className="arrangeButton" onClick={() => dispatchArrangement('1')}  type="button">SELECT</button><span className="price"> ${thisPrice('1')}</span>  
                </div>
              </li>
            </ul>
        : "" }
        { this.props.currentFormSection === "recipient" ?             
            <ul className="recipientForm">
              <li>         
                <div className="orderSummary">
                  <h4>Order Summary</h4>
                  <p className="recipient productName">PRODUCT: {thisProductName(this.props.currentProductCode)}</p>
                  <p className="recipient productPrice">PRICE: ${thisPrice(this.props.currentProductCode)}</p>
                  <p className="recipient productPrice">DELIVERY CHARGE: $20</p>                 
                </div>
              </li>
              <li>
                <h4>PLEASE ENTER RECIPIENT INFO</h4>
              </li>
              <li>            
                <div className="form-input recipientFormFields1 span6">             
                  <label htmlFor="recipientFirstName" className="recipientFirstName">
                    <Field
                      name="recipientFirstName"
                      type="text"
                      component={Input}
                      placeholder="FIRST NAME"
                    />
                  </label>
                  <label htmlFor="recipientLastName" className="recipientLastName">                           
                    <Field
                      name="recipientLastName"
                      type="text"
                      component={Input}
                      placeholder="LAST NAME" 
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
                    />
                  </label>                            
                  <label htmlFor=">recipientState" className="recipientState">                            
                    <Field
                      name="recipientState"
                      type="text"
                      component={Input}
                      placeholder="STATE"
                    />
                  </label>                            
                  <label htmlFor="recipientZipcode" className="recipientZipcode">                          
                    <Field
                      name="recipientZipcode"
                      type="text"
                      component={Input}
                      placeholder="ZIP CODE"
                    />
                  </label>             
                  <label htmlFor="recipientPhone" className="recipientPhone">                           
                    <Field
                      name="recipientPhone"
                      type="text"
                      component={Input}
                      placeholder="CELL PHONE"
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
              </li>
              <li>
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
                <h4 className="senderOrderSum">Order Summary</h4>
                  <p className="recipient productName">PRODUCT: {thisProductName(this.props.currentProductCode)}</p>
                  <p className="recipient productPrice">PRICE: ${thisPrice(this.props.currentProductCode)}</p>
                  <p className="recipient productPrice">DELIVERY CHARGE: ${deliveryCharge}</p>
                  <p className="recipient productPrice">TOTAL: ${+deliveryCharge + +thisPrice(this.props.currentProductCode)}</p>
                  
                </div>
              </li>
                <li>
                
                <div className="senderInfo">
                <h3 className="senderHeader">PLEASE ENTER SENDER INFORMATION</h3>
                  <label htmlFor="senderEmail" className="senderEmail"/>                     
                    <Field
                      name="senderEmail"
                      type="email"
                      component={Input}
                      placeholder="EMAIL"
                    />
                                              
                  <label htmlFor="senderFirstName" className="senderFirstName" />
                    <Field
                      placeholder="FIRST NAME" 
                      name="senderFirstName" 
                      type="text"
                      component={Input}
                      
                    />
                  
                  <label htmlFor="senderLastName" className="senderLastName" />                            
                    <Field
                      name="senderLastName"
                      placeholder="LAST NAME" 
                      type="text"
                      component={Input}
                      
                    />
                                            
                  <label htmlFor="senderPhone" className="senderPhone" />                        
                    <Field
                      name="senderPhone"
                      type="text"
                      component={Input}
                      placeholder="PHONE"  
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
          
            <ul>
              <li>
                <div className="scheduleBlock">
                  <ul>
                  <li className="schedule">
                    <h3>SCHEDULE DELIVERY</h3> 
                  </li>
                <li>
                
                  <div className="scheduleFormFields">
                    <ul>  
                      <li>
                        <Field name="frequency" component="select">
                          <option>How Often</option>
                          <option value="monthly">monthly</option>
                          <option value="bi-weekly">bi-weekly</option>
                          <option value="weekly">weekly</option>
                        </Field>
                      </li>
                    </ul>
                  </div>
                  <div className="scheduleFormFields">
                    <ul>  
                      <li>
                        <Field name="duration" component="select">
                          <option>How Long</option>
                          <option value="3 months">3 months</option>
                          <option value="6 months">6 months</option>
                          <option value="12 months">12 months</option>
                          <option value="ongoing">ongoing</option>
                        </Field>
                      </li>
                      <li className="datePicking">
                  <h2>Choose Delivery Start Date</h2>
                  <Field
                    name="startDate"
                    type="date"
                    component={Input}
                  />
                </li>    

                  </ul>
                </div>
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
          <div>
            <main>
              <header>
                <h4>Here's your subscription details!</h4>
              </header>
              <section>
              <div className="checkoutSum">

              
                <header>
                    <h5>SENDER INFO</h5>
                </header>
                <div className="checkout left span6">
                  <p className="sender name">NAME: {theForm.senderFirstName} {theForm.senderLastName}</p>
                  <p className="sender email">EMAIL: {theForm.senderEmail}</p>
                  <p className="sender phone">PHONE: {theForm.senderPhone}</p>
                  <p className="sender deliveryDate"> START DELIVERY ON: {deliveryDate}</p>                
                  <p className="recipient productName">SELECTION: {thisProductName(this.props.currentProductCode)}</p>                
                  <p className="recipient productPrice">PRICE: ${thisPrice(this.props.currentProductCode)}</p>
                  <p className="recipient productPrice">DELIVERY: ${20}</p>
                  <p className="recipient productPrice">TOTAL: ${+20 + +thisPrice(this.props.currentProductCode)}</p>
                </div>

                <header>
                  <h5>RECIPIENT INFO</h5>
                </header>
                <div className="checkout right span6">
                  <p className="recipient name">NAME: {theForm.recipientFirstName} {theForm.recipientLastName}</p>
                  <p className="recipient company">COMPANY: {theForm.recipientCompany} {theForm.recipientCompany}</p>
                  <p className="recipient phone">PHONE: {theForm.recipientPhone}</p>
                  <p className="recipient streetAddress">STREET ADDRESS: {theForm.recipientAddress}</p>
                  <p className="recipient aptSuite">APT/SUITE: {theForm.recipientAptSuite}</p>
                  <p className="recipient cityStateZip">CITY, STATE, ZIPCODE: {theForm.recipientCity} {theForm.recipientState} {theForm.recipientZipcode}</p>
                  <p className="recipient message">GIFT MESSAGE: {theForm.recipientMessage}</p>
                </div>
                </div>
                <div>{formButton}</div>
              </section>        
            </main>
          </div>
        : ""  }
        { this.props.currentFormSection === "confirm" ?   
          <div className="confirm">
            <main>
              <h2>Thank You!</h2>
              <p className="byebye">Your order will be delivered {this.props.currentDeliveryDate}.</p>
              {formButton}
            </main>
            <section>

            </section>
            <footer role="contentinfo">
            {console.log('this.props.currentValues: ', this.props.currentValues)}
            </footer>

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
  //duration: selector(state.SubscriptionAddForm.duration, 'duration'),
  //choice: selector(state.SubscriptionAddForm.choice, 'choice')
})}

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
