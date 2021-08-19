/**
 * Sign-in Firebase
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import classnames from 'classnames';
import { Link } from 'react-router-dom';

// form validation handling
import validateFields from '../Validator/Validation';

import { Applogo } from '../Entryfile/imagepath.jsx';
import axios from 'axios';

const initialState = {
  email: {
    value: '',
    validateOnChange: false,
    error: ''
  },
  password: {
    value: '',
    validateOnChange: false,
    error: ''
  },
  submitCalled: false,
  auth: false,
  message: null
};

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.loginClick = this.loginClick.bind(this);
  }

  loginClick(e) {
    e.preventDefault();

    const { email, password } = this.state;
    const emailError = validateFields.validateEmail(email.value);
    const passwordError = validateFields.validatePassword(password.value);
    let err = false;

    if ([emailError, passwordError].every(e => e === false)) {
      axios.post("http://localhost:3000/api/login", {
        email: this.state.email.value,
        password: this.state.password.value
      }).then(res => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.data);
          localStorage.setItem("email", this.state.email.value);
          localStorage.setItem("password", this.state.password.value);
        } else {
          err = true;
          this.setState(() => ({
            ...initialState,
            auth: true,
            message: res.data.api
          }));
        }
      }).catch(err => {
        err = true;
        this.setState(() => ({
          ...initialState,
          auth: true,
          message: 'Email/Password wrong!'
        }));
      });
    } else {
      // update the state with errors
      this.setState(state => ({
        email: {
          ...state.email,
          validateOnChange: true,
          error: emailError
        },
        password: {
          ...state.password,
          validateOnChange: true,
          error: passwordError
        }
      }));
      return;
    }

    setTimeout(() => {
      if (!err) {
        localStorage.setItem("firstload", "true");
        this.props.history.push("/app/main/dashboard"); 
      }
    }, 2000);
  }

  handleBlur(validationFunc, evt) {
    const field = evt.target.name;
    // validate onBlur only when validateOnChange for that field is false
    // because if validateOnChange is already true there is no need to validate onBlur
    if (
      this.state[field]['validateOnChange'] === false &&
      this.state.submitCalled === false
    ) {
      this.setState(state => ({
        [field]: {
          ...state[field],
          validateOnChange: true,
          error: validationFunc(state[field].value)
        }
      }));
    }
    return;
  }

  handleChange(validationFunc, evt) {
    const field = evt.target.name;
    const fieldVal = evt.target.value;
    this.setState(state => ({
      [field]: {
        ...state[field],
        value: fieldVal,
        error: state[field]['validateOnChange'] ? validationFunc(fieldVal) : ''
      },
      auth: false
    }));
  }


  render() {
    const { email, password } = this.state;

    return (
      <div className="main-wrapper">
        <Helmet>
          <title>Login - HRMS Admin Template</title>
          <meta name="description" content="Login page" />
        </Helmet>

        <div className="account-content">
          <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">
            Apply Job
          </Link>

          <div className="container">
            {/* Account Logo */}
            <div className="account-logo">
              {/* // TODO(Umar): change div to <a href="/blue/app/main/dashboard"></a> in case needed. */}
              <div><img src={Applogo} alt="Dreamguy's Technologies" /></div>
            </div>

            {/* /Account Logo */}
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Login</h3>
                <p className="account-subtitle">Access to our dashboard</p>

                {/* Account Form */}
                <form onSubmit={this.loginClick}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={email.value}
                      className={classnames(
                        'form-control',
                        { 'is-valid': email.error === false },
                        { 'is-invalid': email.error }
                      )}
                      onChange={evt =>
                        this.handleChange(validateFields.validateEmail, evt)
                      }
                      onBlur={evt =>
                        this.handleBlur(validateFields.validateEmail, evt)
                      }
                    />
                    <div className="invalid-feedback">{email.error}</div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Password</label>
                      </div>
                      <div className="col-auto">
                        <Link className="text-muted" to="/forgotpassword">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={password.value}
                      className={classnames(
                        'form-control',
                        { 'is-valid': password.error === false },
                        { 'is-invalid': password.error }
                      )}
                      onChange={evt =>
                        this.handleChange(validateFields.validatePassword, evt)
                      }
                      onBlur={evt =>
                        this.handleBlur(validateFields.validatePassword, evt)
                      }
                    />
                    <div className="invalid-feedback">{password.error}</div>
                  </div>
                  <div className="form-group text-center">
                    {/* <a className="btn btn-primary account-btn" href="/blue/app/main/dashboard">
                    </a> */}
                    <button onMouseDown={() => this.setState({ submitCalled: true })} className="btn btn-primary account-btn" type="submit">Login</button>
                  </div>
                  <h5 className="auth-error">
                    {this.state.auth && (<div>
                      {this.state.message}
                    </div>)}
                  </h5>
                  <div className="account-footer">
                    <p>Don't have an account yet? <Link to="/register">Register</Link></p>
                  </div>
                </form>
                {/* end /Account Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
