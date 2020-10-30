import React, { Component } from 'react';
import FormInput from '../FormInput/FormInput';
import classes from './Signup.module.css';
import { userCheckFormat, signUpFormat } from '../../utility/utility';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        firstName: {
          value: '',
          validation: {
            required: true,
            minLength: 3,
          },
          valid: false,
        },
        lastName: {
          value: '',
          validation: {
            required: true,
            minLength: 3,
          },
          valid: false,
        },
        email: {
          value: '',
          validation: {
            required: true,
          },
          valid: false,
        },
        password: {
          value: '',
          validation: {
            required: true,
            minLength: 6,
          },
          valid: false,
        },
        confirmPassword: '',
      },
    }
  }

  handleChange = event => {
    const { value, name } = event.target;
    if (name === 'confirmPassword') {
      this.setState({ [name]: value });
    } else {
      const updatedData = {
        ...this.state.data
      };
      const updatedField = {
        ...updatedData[name]
      };
      updatedField.value = value;
      updatedData[name] = updatedField;
      this.setState({ data: updatedData });
    }
  }

  render() {
    const {
      firstName, lastName, email, password, confirmPassword,
    } = this.state.data;
    return (
      <div className={classes.Signup}>
        <h2 className={classes.Title}>Create your account with us.</h2>
        <span>Signup to get access</span>
        <form onSubmit={this.handleSubmit} className={classes.Form}>
          <FormInput
            type="text"
            name="firstName"
            label="First Name:"
            value={firstName.value}
            handleChange={this.handleChange}
            placeholder='First name'
            required
          />
          <FormInput
            type="text"
            name="lastName"
            label="Last Name:"
            value={lastName.value}
            handleChange={this.handleChange}
            placeholder='Last name'
            required
          />
          <FormInput
            type="email"
            name="email"
            label="Email:"
            value={email.value}
            handleChange={this.handleChange}
            placeholder='Email please'
            required
          />
          <FormInput
            type="password"
            name="password"
            label="Password:"
            value={password.value}
            handleChange={this.handleChange}
            placeholder='Enter password'
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirm password:"
            value={confirmPassword}
            handleChange={this.handleChange}
            placeholder='Confirm password'
            required
          />
          <button type="submit" className={classes.SignupButton}>Sign up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
