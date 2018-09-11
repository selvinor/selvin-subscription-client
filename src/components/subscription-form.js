import React from 'react';
import {Field, SubmissionError, reduxForm} from 'redux-form';
import Input from './input';
//import {required, pristine, submitting} from '../validators';
import './subscription-form.css'; 


export class SubscriptionForm extends React.Component {
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
      <div>
        <h1>Hello World</h1>
        <form onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
          )}>
          {successMessage}
          {errorMessage} 
          <div class="arrangement">
            <span class="thumb">
            <img class="thumbnail" src="../img/flowers.jpg" alt=""/> 
          </span>
          <div class="form-input">
            <Field
              name="large"
              type="radio"
              component={Input}
              label="Designer's Lobby Arrangement"
              value="lobby"
            />
          </div>
        </div>
        <div class="arrangement"> 
          <span class="thumb">
            <img class="thumbnail" src="../img/flowers.jpg" alt=""/> 
          </span>
          <div class="form-input">
            <Field
              name="personal"
              type="radio"
              component={Input}
              label="Designer's Choice Arrangement"
              value="choice"
            />
          </div>
        </div>
        <div class="arrangement">
          <span class="thumb">
            <img class="thumbnail" src="../img/flowers.jpg" alt=""/> 
          </span>
         <div class="form-input">
            <Field
              name="gift"
              type="radio"
              component={Input}
              label="Designer's Bouquet"
              value="bouquet"
            />
          </div>
        </div>
          
        {/* <button type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button> */}
          <button type="submit" >Submit</button> 
        </form> 
      </div>

    )
  }
}
export default reduxForm({
  form: 'subscriptionForm'
})(SubscriptionForm); 




      //   <div class="arrangement">
      //     <Field
      //       name="personal"
      //       type="radio"
      //       component={Input}
      //       label="Personal Subscription"
      //       value="personal"
      //     />
      //   </div>
      //   <div class="form-input">
      //   <label>SUBSCRIPTION</label>
      //     <Field
      //       name="weekly"
      //       type="radio"
      //       component={Input}
      //       label="WEEKLY"
      //       value="weekly"
      //     />
      //     <Field
      //       name="biWeekly"
      //       type="radio"
      //       component={Input}
      //       label="BI_WEEKLY"
      //       value="biWeekly"
      //     />
      //     <Field
      //       name="monthly"
      //       type="radio"
      //       component={Input}
      //       label="MONTHLY"
      //       value="gift"
      //     />
      //   </div>
      //   <div class="form-input">
      //     <Field
      //       name="giftmsg"
      //       type="textarea"
      //       component={Input}
      //       label="GIFT MESSAGE"
      //     />
      //   </div>
      //   <div class="form-input">
      //   <label>DURATION</label>
      //     <Field
      //       name="threeMonths"
      //       type="radio"
      //       component={Input}
      //       label="3 MONTHS"
      //     />
      //     <Field
      //       name="sixMonths"
      //       type="radio"
      //       component={Input}
      //       label="6 MONTHS"
      //     />
      //     <Field
      //       name="twelveMonths"
      //       type="radio"
      //       component={Input}
      //       label="12 MONTHS"
      //     />
      //     <Field
      //       name="ongoing"
      //       type="radio"
      //       component={Input}
      //       label="ON-GOING" 
      //     />
      //   </div>
        
      // {/* <button type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button> */}
      //   <button type="submit" >Submit</button>
      // </form>    
//     )
//   }
// }
// export default SubscriptionForm({
//   form: 'subscriptionForm'
// })(SubscriptionForm); 