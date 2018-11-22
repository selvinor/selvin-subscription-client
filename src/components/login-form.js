import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import { Link } from 'react-router-dom';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        const registerButton = (<button className="jump" type="button"><Link style={{display: 'block', height: '100%', textDecoration:'none', color:'black'}} to="/register" >Register</Link></button>);

        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <label htmlFor="username">Sign In</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    autocomplete="username"
                    validate={[required, nonEmpty]}
                />
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="enter password"
                    autocomplete="current-password"
                    validate={[required, nonEmpty]}
                />
                <button className="login" disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
                {registerButton}

            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
