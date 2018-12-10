import React, { Fragment } from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {userName, password, firstName, lastName, email, phone} = values;
        const user = {userName, password, firstName, lastName, email, phone};
        console.log('user:' , user);
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(userName, password)));
    } 

    render() {
      let successMessage;
      if (this.props.submitSucceeded) {
        successMessage = (
          <div className= "message message-success">
            Your account is ready!
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
          <Fragment>
            <form
                className="registration-form" 
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
              {successMessage}
              {errorMessage} 
                <label htmlFor="userName">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="userName"
                    validate={[required, nonEmpty, isTrimmed]}
                    placeholder="required"
                />
                <label htmlFor="firstName">First name</label>
                <Field component={Input} type="text" name="firstName" placeholder="required" />
                <label htmlFor="lastName">Last name</label>
                <Field component={Input} type="text" name="lastName"  placeholder="required" />
                <label htmlFor="email">Email</label>
                <Field
                    component={Input}
                    type="email"
                    name="email"
                    validate={[required, nonEmpty, isTrimmed]}
                    placeholder="required"
                />
                <label htmlFor="phone">Phone</label>
                <Field component={Input} type="text" name="phone"  placeholder="required" />
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    autocomplete="new-password"
                    validate={[required, passwordLength, isTrimmed]}
                    placeholder="required"
                />
                <label htmlFor="passwordConfirm">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    autocomplete="new-password"
                    validate={[required, nonEmpty, matchesPassword]}
                    placeholder="required"
                />
                <div className="registration-buttons">
                  <button
                    className="registration"
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                  </button>

                </div>
            </form>
          </Fragment>
        );
    }
}

export default reduxForm({ 
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
