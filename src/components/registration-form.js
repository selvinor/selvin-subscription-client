import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName, email} = values;
        const user = {username, password, firstName, lastName, email};
        console.log('user:' , user);
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    } 

    render() {
        return (
            <form
                className="login-form" 
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="firstName">First name</label>
                <Field component={Input} type="text" name="firstName" placeholder="required" />
                <label htmlFor="lastName">Last name</label>
                <Field component={Input} type="text" name="lastName"  placeholder="required" />
                <label htmlFor="username">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    validate={[required, nonEmpty, isTrimmed]}
                    placeholder="required"
                />
                <label htmlFor="email">Email</label>
                <Field
                    component={Input}
                    type="email"
                    name="email"
                    validate={[required, nonEmpty, isTrimmed]}
                    placeholder="required"
                />
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
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
            </form>
        );
    }
}

export default reduxForm({ 
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
