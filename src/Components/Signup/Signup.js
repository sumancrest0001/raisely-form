import React, { Component } from 'react';
import axios from 'axios';
import FormInput from '../FormInput/FormInput';
import MessageModal from '../../UI/messageModal/messageModal';
import classes from './Signup.module.css';

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
          touched: false,
        },
        lastName: {
          value: '',
          validation: {
            required: true,
            minLength: 3,
          },
          message: 'Must have at least 3 characters',
          valid: false,
          touched: false,
        },
        email: {
          value: '',
          validation: {
            required: true,
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          },
          message: 'Enter valid email',
          valid: false,
          touched: false,
        },
        password: {
          value: '',
          validation: {
            required: true,
            minLength: 6,
          },
          message: 'Must have at least 6 characters',
          valid: false,
          touched: false,
        },
        confirmPassword: {
          value: '',
          valid: false,
        },
      },
      allValid: true,
      httpRequest: {
        message: '',
        openModal: false,
      }
    }
  }

  checkAllValidity = (inputData) => {
    let isValid = true;
    for (let inputField in inputData) {
      isValid = inputData[inputField].valid && isValid;
    }
    return isValid;
  }

  checkValidity = (validationRules, value) => {
    let isValid = true;
    let updatedHttpData = {
      ...this.state.httpRequest
    }
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
        isValid = (validationRules.pattern.test(value)) && isValid;
        if (isValid === true) {
          axios.post('https://api.raisely.com/v3/check-user', {
            "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
            "data": {
              "email": value,
            }
          }).then(
            response => {
              if (response.data.data.status === 'EXISTS') {
                updatedHttpData.message = "Email exists. Select another one";
                updatedHttpData.openModal = true;
                this.setState({ httpRequest: updatedHttpData });
                return false;
              }
            }
          ).catch(
            error => {
              console.log(error);
            }
          )
        }
      }
    }
    return isValid;
  }

  handleHttpRequest = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state.data;
    let updatedHttpData = {
      ...this.state.httpRequest
    }
    axios.post('https://api.raisely.com/v3/signup', {
      "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
      "data": {
        "firstName": firstName.value,
        "lastName": lastName.value,
        "email": email.value,
        "password": password.value
      }
    }).then(
      response => {
        updatedHttpData.message = "Welcome to Raisely";
        updatedHttpData.openModal = true;
        this.setState({ httpRequest: updatedHttpData });
      }
    ).catch(
      error => {
        updatedHttpData.message = "Something went wrong. Try again";
        updatedHttpData.openModal = true;
        this.setState({ httpRequest: updatedHttpData });
      });
  }

  closeMessageModal = () => {
    const updateHttpRequest = {
      ...this.state.httpRequest
    };
    updateHttpRequest.openModal = false;
    this.setState({ httpRequest: updateHttpRequest });
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
    updatedField.touched = true;
    if (name === 'confirmPassword') {
      updatedField.valid = this.comparePasswords(value, password.value);
    } else {
      updatedField.valid = this.checkValidity(updatedField.validation, value);
    }

    updatedData[name] = updatedField;
    this.setState({ data: updatedData, allValid: this.checkAllValidity(updatedData) });
  }

  render() {
    const {
      firstName, lastName, email, password, confirmPassword,
    } = this.state.data;
    const { allValid, httpRequest } = this.state;
    return (
      <div className={classes.Signup}>
        {httpRequest.openModal && <MessageModal onClose={this.closeMessageModal}>{httpRequest.message}</MessageModal>}
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
            touched={firstName.touched}
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
            touched={lastName.touched}
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
            touched={email.touched}
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
            touched={password.touched}
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
            touched={confirmPassword.touched}
            required
          />
          <button
            type="submit"
            className={classes.SignupButton}
            disabled={!allValid}
            onClick={this.handleHttpRequest}
          >
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
