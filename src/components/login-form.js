import React, { Fragment } from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import { Link, Redirect } from 'react-router-dom';
import HeaderBar from './header-bar';
import './styles/login.css';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.userName, values.password));

    }

    render() {
      console.log('***Checking if We are logged in this.props.loggedIn ***', this.props.loggedIn);
      if (this.props.loggedIn) {
        console.log('***We are logged in ***');
      } 
      if (this.props.loggedIn) {
        console.log('yes');
        return <Redirect to="/" />;
      }
      let error;
      if (this.props.error) {
          error = (
              <div className="form-error" aria-live="polite">
                  {this.props.error}
              </div>
          );
      }
      const registerButton = (<button className="jump" type="button"><Link style={{display: 'block', height: '100%', textDecoration:'none', color:'white', }} to="/register" >Register</Link></button>);

      return (
        <Fragment>
        <section id="main" className="signin">
          <HeaderBar />
          <section className="login-section">
            <form
              className="login-form"
              onSubmit={this.props.handleSubmit(values =>
                  this.onSubmit(values)
              )}>
              {error}
              <label htmlFor="userName">Sign In</label>
              <Field
                  component={Input}
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="userName"
                  autocomplete="userName"
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
              <div className="login-buttons">
                <button className="login" disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
                {registerButton}
              </div>
            </form>
          </section>
        </section>
      </Fragment>
      );
  }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'userName'))
})(LoginForm);
