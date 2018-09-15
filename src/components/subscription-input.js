import * as React from 'react';
import { Field } from 'redux-form';
import Input from './input';
export const Arrangements = props => {
  if (props && props.input && props.options) {

    return (
      <div>
      <ul>
        <li>
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
        <li className="business">
            <p>SUBSCRIPTION</p>
            <div className="business form-input">
            <label htmlFor="large">Business 
              <Field
                name="business"
                type="radio"
                component={Input}
                className="business"
              /></label>
              </div>
              <div className="residential form-input">
              <label htmlFor="large">Residence
              <Field
                name="business"
                type="radio"
                component={Input}
                className="residential"
              /></label>
            </div>
            <div className="form-input">
              <label htmlFor="receiverMsg" className="receiverMsg">Message
                <Field
                  name="receiverMsg"
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
      </ul>
    </div>
    );
  }

}

export default Arrangements;