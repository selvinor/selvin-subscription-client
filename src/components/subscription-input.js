import  React from 'react';

export default class Input extends React.Component {
  render() {
      return `
    <div>
      <ul>
        <li>
          <div className="buyerInfo">
            <label htmlFor="buyerEmail" className="buyerEmail">Buyer Email</label>                            
              <Field
                name="buyerEmail"
                type="email"
                component={Input}
              />
                                        
            <label htmlFor="buyerFirstName" className="buyerFirstName">Buyer First Name</label>
              <Field
                name="buyerFirstName"
                type="text"
                component={Input}
              />
            
            <label htmlFor="buyerLastName" className="buyerLastName">Buyer Last Name</label>                            
              <Field
                name="buyerLastName"
                type="text"
                component={Input}
              />
                                      
            <label htmlFor="buyerPhone" className="buyerPhone">Buyer Phone</label>                            
              <Field
                name="buyerPhone"
                type="text"
                component={Input}
              />                                      
          </div>
        </li>
        <li className="gift">
            <p>SUBSCRIPTION</p>
            <div className="gift form-input">
            <label htmlFor="large">Gift Subscription
              <Field
                name="gift"
                type="radio"
                component={Input}
                className="gift"
              /></label>
              </div>
              <div className="personal form-input">
              <label htmlFor="large">Personal Subscription
              <Field
                name="gift"
                type="radio"
                component={Input}
                className="personal"
              /></label>
            </div>
            <div className="form-input">
              <label htmlFor="giftmsg" className="giftMsg">Gift Message
                <Field
                  name="giftmsg"
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
   `
  }
}