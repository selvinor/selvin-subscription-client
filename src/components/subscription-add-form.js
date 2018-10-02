import React from 'react';
import {Field, SubmissionError, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Input from './input';
import {required, nonEmpty} from '../validators';
import './subscription-add-form.css'; 
import { setSection, setNumberOfDeliveries, setProductChoice, setFrequency, setDuration, setDeliveryDate } from '../actions';
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



    const dispatchProductChoice = (choice) => {
      this.props.dispatch(setProductChoice(choice)) ;
    }
    const dispatchFrequency = (frequency) => {
      this.props.dispatch(setFrequency(frequency));
    }    
    const dispatchDuration = (duration) => {
      this.props.dispatch(setDuration(duration)) ;
    }        
    const dispatchSection = (section) => {
      this.props.dispatch(setSection(section)) ;
    }        
    const dispatchStartDate = (begin) => {
      this.props.dispatch(setDeliveryDate(begin)) ;
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
      setNumberOfDeliveries(numberOfDeliveries);       
    }
    
  const validateEmail =function (email) {
      var re = /\S+@\S+/;
      return re.test(email);
  }
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

    switch (section) {
      case 'recipient':
        fieldsToCheck = [0,1,3,5,6,7,8];
        destination = 'sender';
        formSection = 'recipients';
      break;
      case 'sender':
        fieldsToCheck = [0,1,2,3];
        destination = 'schedule';
        formSection = 'senderData';
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
        formSection = 'recipients';
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
        case 'sender':
          if (check[i].name === 'email' ) {
            if (check[i].value === '' || validateEmail(check[i].value) === false) {
              check[i].value = '';
              check[i].placeholder = "Valid email is required";
              badFieldCount++;
              badFields.push(i);
            }
          } else {
            if (check[i].value === '' && fieldsToCheck.includes(i)) {
              badFieldCount++;
              badFields.push(i);
              check[i].placeholder = check[i].name.substring(6) + " is required";
            }            
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
            let e = document.getElementById("frequency");
            if (e.options[e.selectedIndex]) {
              let strFreq = e.options[e.selectedIndex].value;
            }
            let f = document.getElementById("duration");
            if (f.options[f.selectedIndex]) {
              let strDur = f.options[f.selectedIndex].value;
            }
            dispatchNumberOfDeliveries();
          // dispatchStartDate(firstAvailableDate());
        
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
  switch (this.props.currentFormSection) {
    case 'schedule':
      formButton = ( <button className="jump" onClick={() => validateFields('schedule');}  type="button">NEXT</button>); 
      break;
    case 'recipient':
      formButton = (<button className="jump"  onClick={() => validateFields('recipient')}  type="button">NEXT</button>);
      break;
      case 'sender':
      formButton = (<button className="jump"  onClick={() => validateFields('sender')}  type="button">NEXT</button>);
      break;
    case 'checkout':
      formButton = (<button  className="jump" type="submit" disabled={this.props.pristine || this.props.submitting}>SUBSCRIBE!</button>);
      break;
    case 'confirm':
      formButton = ( <button className="jump"  onClick={() => dispatchSection('arrangement')}  type="button">Finish</button>); 
      break;
    case 'onboarding':
      formButton = ( <button className="jump"  onClick={() => dispatchSection('arrangement')}  type="button">Get Started</button>); 
      break;
    default:
      formButton = ( <button className="jump"  onClick={() => dispatchSection('arrangement')}  type="button">Finish</button>); 
    break;
  }   

   // const deliveryDate = mm + '/' + dd + '/' + yyyy;
    const deliveryCharge = 20;
    //SET THE PRODUCT NAME
    const theForm = this.props.currentValues;
    const thisProductName = pCode => {
      if (pCode === 'p1') {
        return "Designer's Bouquet";
      } else {
        if (pCode === 'p2') {
          return "Designer's Choice Arrangement";
        } else {
          if (pCode === 'p3') {
            return "Designer's Lobby Arrangement";
          }
        }  
      }
    }

  //SET THE PRODUCT PRICE
    const thisPrice = pCode => {
      if (pCode === 'p1') {
        return "35";
      } else {
        if (pCode === 'p2') {
          return "65";
        } else {
          if (pCode === 'p3') {
            return "150";
          }
        }  
      }
    }
    const thisProductDesc = pCode => { 
      if (pCode === 'p1') {
        return "An easy way to brighten up and beautify your home or office, plus, you can even schedule deliveries throughout the year based on birthdays, holidays, and special occasions. ";
      } else {
        if (pCode === 'p2') {
          return "Beautiful, fresh, custom flower arrangements for your home or office, delivered on a weekly or monthly basis. Plus, you can even schedule deliveries throughout the year based on birthdays, holidays, and special occasions. ";
        } else {
          if (pCode === 'p3') {
            return "See your lobby transformed by each successive flower arrangement. As the season changes, so does the theme.";
          }
        }  
      }

    }

    let deliveryMsg = '';

    return (
      <div>
        <header role="heading">
          <h1>Blooms Subscriptions</h1>
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
                <h2>Welcome to Blooms Floral Subscription Service!</h2> 
                <p>Blooms provides an easy way to brighten up and beautify your home or office on a regular basis.</p>
                <p>We will deliver beautiful, fresh, custom flower arrangements straight to your home or office on a regular schedule!</p>
                <p>All you need to do is set your flower preferences and delivery details, and that’s it!</p>
                <p>Click the button, and we'll get you set up right away!</p>
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
                      <img className="thumbnail"  onClick={() => {
                        dispatchProductChoice('p3');
                        dispatchSection('detail');
                      }} src="../img/_DSC3098.png" alt=""/>
                  </div>                                   
                  <div className="pickArr3">
                    <p className="arrangementName ">{thisProductName('p3')}</p>
                    <button className="arrangeButton" onClick={() => {
                        dispatchProductChoice('p3');
                        dispatchSection('detail');
                    }}  type="button">SELECT</button><span className="price"></span>                 
                  </div>
                </div>
              </li>
              <li className="arrangement"> 
                <div className="arrangement2">          
                  <div className="thumb">             
                    <img className="thumbnail"  onClick={() => {
                      dispatchProductChoice('p2');
                      dispatchSection('detail');
                    }} src="../img/_DSC2980.png" alt=""/>
                  </div>
                  <div className="pickArr2">
                    <p className="arrangementName">{thisProductName('p2')}</p>
                    <button className="arrangeButton" onClick={() => {
                      dispatchProductChoice('p2');
                      dispatchSection('detail');
                    }}  type="button">SELECT</button><span className="price"></span>                 
                  </div>
                </div>
              </li>
              <li className="arrangement">     
                <div className="arrangement1">   
                  <div className="thumb">             
                    <img className="thumbnail"  onClick={() => {
                      dispatchProductChoice('p1');
                      dispatchSection('detail');
                    }} src="../img/_DSC3345.png" alt=""/>
                  </div>
                  <div className="pickArr1">
                    <p className="arrangementName">{thisProductName('p1')}</p>
                    <button className="arrangeButton" onClick={() => {
                      dispatchProductChoice('p1');
                      dispatchSection('detail');
                    }}  type="button">SELECT</button><span className="price"></span>                 
                  </div>
                </div>
              </li>
            </ul>
        : "" }
        { this.props.currentFormSection === "detail" ?             
            <ul>
              <li>
              <button className="jumpBack"  onClick={() => dispatchSection('arrangement')}  type="button">BACK</button>              
                <div className="productDetail">
                  <h5>{thisProductName(this.props.currentProductCode)}</h5> 
                  <div className={'productPhoto_' + this.props.currentProductCode} onClick={() => { 
                    this.props.dispatch(setDeliveryDate(firstAvailableDate()));
                    dispatchProductChoice(this.props.currentProductCode);
                  }} >
                  </div>
                  <p className="productDetailPrice">Starting at: ${thisPrice(this.props.currentProductCode)}</p>
                  <p className="productDetailDesc">{thisProductDesc(this.props.currentProductCode)}</p> 
                  <button className="chooseButton" onClick={() => {
                    this.props.dispatch(setDeliveryDate(firstAvailableDate()));
                    dispatchFrequency('monthly');
                    dispatchDuration('3 months');
                    dispatchProductChoice(this.props.currentProductCode);
                  }}  type="button">SELECT</button><span className="price"></span>                
                </div>
              </li>
            </ul>
        : ""  }
        { this.props.currentFormSection === "recipient" ?             
            <ul id="recipients" className="recipientInfo">
              <li>         
              <button className="jumpBack"  onClick={() => dispatchSection('arrangement')}  type="button">BACK</button>              
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
            <ul id="senderData">
              <li>         
              <button className="jumpBack"  onClick={() => dispatchSection('recipient')}  type="button">BACK</button>              
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
                      name="email"
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
              <div className="formButton senderData">
                  {formButton}
                </div>
              </li>
            </ul>  

        : ""  }  
        { this.props.currentFormSection === "schedule" ?  
        <ul id="scheduleInfo">
              <li>
              <button className="jumpBack"  onClick={() => dispatchSection('sender')}  type="button">BACK</button>              
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
       
   
        : ""  }  
        { this.props.currentFormSection === "checkout" ?   
          <div className="checkout">
            <main>
              <header>
              <button className="jumpBack"  onClick={() => dispatchSection('schedule')}  type="button">BACK</button>              
                <h4>If everything looks good, please click the 'subscribe' button to start your subscription!</h4>
              </header>
              <section>
                <div className="checkoutSum">              
                  <div className="orderSummary">
                    <h5>Order Details</h5>
                    <p className="recipient checkout"><span>Product: </span>{thisProductName(this.props.currentProductCode)}</p>
                    <p className="recipient checkout"><span>Price: </span>${thisPrice(this.props.currentProductCode)}</p>
                    <p className="recipient checkout"><span>Delivery: </span>$20</p>                 
                    <p className="recipient checkout"><span>TOTAL: </span>${+deliveryCharge + +thisPrice(this.props.currentProductCode)}</p> 
                  
                  </div>
                  <div className="leftSide">
                    <div className="senderBlock">
                      <h5>Sender Info</h5>
                      <p className="sender name"><span>NAME: </span>{theForm.senderFirstName} {theForm.senderLastName}</p>
                      <p className="sender email"><span>EMAIL: </span>{theForm.email}</p>
                      <p className="sender phone"><span>PHONE: </span>{theForm.senderPhone}</p>  
                      <p className="recipient message"><span>GIFT MESSAGE: </span>{theForm.recipientMessage}</p>    
                    </div>
                  </div>    
                  <div className="rightSide">
                    <div className="receiverBlock">
                      <h5>Recipient Info</h5>
                      <p className="recipient name"><span>NAME: </span>{theForm.recipientFirstName} {theForm.recipientLastName}</p>
                      <p className="recipient company"><span>COMPANY: </span>{theForm.recipientCompany} {theForm.recipientCompany}</p>
                      <p className="recipient phone"><span>PHONE: </span>{theForm.recipientPhone}</p>
                      <p className="recipient streetAddress"><span>STREET ADDRESS: </span>{theForm.recipientAddress}</p>
                      <p className="recipient aptSuite"><span>APT/SUITE: </span>{theForm.recipientAptSuite}</p>
                      <p className="recipient cityStateZip"><span>CITY, STATE, ZIPCODE: </span>{theForm.recipientCity} {theForm.recipientState} {theForm.recipientZipcode}</p>

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
            <div className="confirmButton">{formButton}</div>
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
  currentDeliveryDate: state.subscription.currentDeliveryDate
})}

  const mapDispatchToProps = dispatch => {
    return {
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
