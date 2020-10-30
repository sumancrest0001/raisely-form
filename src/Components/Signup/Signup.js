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
          message: 'Must have at least 3 characters',
          valid: false,
        },
        lastName: {
          value: '',
          validation: {
            required: true,
            minLength: 3,
          },
          message: 'Must have at least 3 characters',
          valid: false,
        },
        email: {
          value: '',
          validation: {
            required: true,
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          },
          message: 'Enter valid email',
          valid: false,
        },
        password: {
          value: '',
          validation: {
            required: true,
            minLength: 6,
          },
          message: 'Must have at least 6 characters',
          valid: false,
        },
        confirmPassword: {
          value: '',
          valid: false,
        },
      },
    }
  }

  checkValidity = (validationRules, value) => {
    let isValid = true;
    if (!validationRules) {
      return true;
    } else {
      if (validationRules.required) {
        isValid = value.trim() !== '' && isValid;
      }
      if (validationRules.minLength) {
        isValid = value.length >= validationRules.minLength && isValid;
      }
      if (validationRules.pattern) {
        isValid = value.match(validationRules.pattern) && isValid;
      }
    }
    return isValid;
  }

  comparePasswords = (confirmPassword, password) => {
    return confirmPassword === password ? true : false;
  }

  handleChange = event => {
    const { password } = this.state.data;
    const { value, name } = event.target;
    const updatedData = {
      ...this.state.data
    };
    const updatedField = {
      ...updatedData[name]
    };
    updatedField.value = value;
    if (name === 'confirmPassword') {
      updatedField.valid = this.comparePasswords(value, password.value);
    } else {
      updatedField.valid = this.checkValidity(updatedField.validation, value);
    }
    updatedData[name] = updatedField;
    this.setState({ data: updatedData });
    console.log(this.state.data);
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
            message={firstName.message}
            validity={firstName.valid}
            required
          />
          <FormInput
            type="text"
            name="lastName"
            label="Last Name:"
            value={lastName.value}
            handleChange={this.handleChange}
            placeholder='Last name'
            message={lastName.message}
            validity={lastName.valid}
            required
          />
          <FormInput
            type="email"
            name="email"
            label="Email:"
            value={email.value}
            handleChange={this.handleChange}
            placeholder='Email please'
            message={email.message}
            validity={email.valid}
            required
          />
          <FormInput
            type="password"
            name="password"
            label="Password:"
            value={password.value}
            handleChange={this.handleChange}
            placeholder='Enter password'
            message={password.message}
            validity={password.valid}
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirm password:"
            value={confirmPassword.value}
            handleChange={this.handleChange}
            placeholder='Confirm password'
            validity={confirmPassword.valid}
            required
          />
          <button type="submit" className={classes.SignupButton}>Sign up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
