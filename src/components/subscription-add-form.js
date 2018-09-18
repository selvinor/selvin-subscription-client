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
    formButton = ( <button onClick={() => console.log('state: ', this.props)}  type="button">Schedule it</button>); 

    // CONTROL FLOW BY Setting custom button for each section
 
    switch (this.props.currentFormSection) {
      case 'schedule':
        formButton = ( <button className="jump" onClick={() => dispatchNumberOfDeliveries()}  type="button">Schedule it</button>); 
        break;
      case 'sender':
        formButton = (<button className="jump"  onClick={() => this.props.dispatch(jumpToSection('checkout'))}  type="button">Checkout</button>);
        break;
      case 'receiver':
        formButton = (<button  className="jump" type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button>);
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
// GET DELIVERY DATE
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

    //SET THE PRODUCT NAME
    const theForm = this.props.currentValues;
    const thisProduct = pCode => {
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
        return "$35";
      } else {
        if (pCode === '2') {
          return "$65";
        } else {
          if (pCode === '3') {
            return "$125";
          }
        }  
      }
    }

    return (
      <div>
        <h2>FLOWER SUBSCRIPTION SERVICE</h2>
        <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          {successMessage}
          {errorMessage} 
      { this.props.currentFormSection === "arrangement" ?             
        <ul>
          <li><h3>CHOOSE THE ARRANGEMENT TYPE</h3></li>
          <li className="arrangement"> 
            <div>         
              <div className="thumb">
                <img className="thumbnail" src="../img/flowers.jpg" alt=""/> 
              </div>
              <div className="flowerChoice form-input"> 
                <h3 className="arrangementName">{thisProduct('3')}<span className="price"> {thisPrice('3')}</span></h3>          
                <button className="arrangeButton" onClick={() => dispatchArrangement('3')}  type="button">SELECT</button>            
              </div>
            </div>
          </li>
          <li className="arrangement">          
            <div className="thumb">
              <img className="thumbnail" src="../img/flowers.jpg" alt=""/> 
            </div>
            <div className="flowerChoice form-input">            
            <h3 className="arrangementName">{thisProduct("2")}<span className="price"> {thisPrice('2')}</span>}</h3>                      
              <button className="arrangeButton" onClick={() => dispatchArrangement('2')}  type="button">SELECT</button>             
            </div>
          </li>
          <li className="arrangement">          
            <div className="thumb">
              <img className="thumbnail" src="../img/flowers.jpg" alt=""/> 
            </div>
            <div className="flowerChoice form-input">                    
            <h3 className="arrangementName">{thisProduct("1")}<span className="price"> {thisPrice('1')}</span></h3>      
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
          <li className="datePicking">
            <h3> Date Picker</h3>
            <Field
                name="startDate"
                type="date"
                component={Input}
              />
          </li>    

          <li>
            <h3 className="frequency">FREQUENCY: {this.props.currentFrequency}</h3>

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
            <h3 className="duration">DURATION: {this.props.currentDuration}</h3>
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
            <h3>PLEASE ENTER SENDER INFORMATION</h3>
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
          <li><h3>PLEASE ENTER RECIPIENT INFO</h3></li>
          <li>
          <div className="form-input">
            <label htmlFor="recipientFirstName" className="recipientFirstName">First Name
              <Field
                name="recipientFirstName"
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
            <label htmlFor="recipientAddress1" className="recipientAddress1">Recipient Street Address 1                            
              <Field
                name="recipientAddress1"
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
            <label htmlFor="recipientPhone" className="recipientPhone">Recipient Phone                           
              <Field
                name="recipientPhone"
                type="text"
                component={Input}
              />
            </label>             
          </div>
          </li>
          <li>
          {formButton}
          </li>
        </ul>  

      : ""  }  
      { this.props.currentFormSection === "checkout" ?   
      <div>
        <main>
          <div className="container">
            <div className="orderSummary">
              <p className="recipient name">{theForm.recipientFirstName} {theForm.recipientLastName}</p>
              <p className="recipient phone">{theForm.recipientPhone}</p>
              <p className="recipient address1">{theForm.recipientAddress1}</p>
              <p className="recipient address2">{theForm.recipientAddress2}</p>
              <p className="recipient cityStateZip">{theForm.recipientCity} {theForm.recipientState} {theForm.recipientZipcode}</p>
              <p className="recipient deliveryDate">{deliveryDate}</p>
              <p className="recipient productName">{thisProduct(this.props.currentProductCode)}</p>
              <p className="recipient productPrice">{thisPrice(this.props.currentProductCode)}</p>
              <p className="recipient totalAmount">{thisPrice(this.props.currentProductCode)}</p>
            </div>
          </div>
          {formButton}
        </main>
        <section>

        </section>
        <footer>
        {console.log('this.props.currentValues: ', this.props.currentValues)}
        </footer>

      </div>
          
      
      

      : ""  }
      { this.props.currentFormSection === "confirm" ?   
      <div>
        <nav role="menu">

        </nav>
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
      {/* 
      //  MULTIPLE RECIPIENTS AND DELIVERIES
      { this.props.currentFormSection === "receiver" ?   
      <div>
        <FieldArray name="recipients" component={renderRecipients}/>
      </div>

      : ""  } */}


      </form> 
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
  currentDeliveryDate: state.subscription.currentDeliveryDate
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
