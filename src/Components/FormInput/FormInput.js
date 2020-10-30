import React from 'react';
import classes from './FormInput.module.css';

const formInput = ({ handleChange, label, message, ...otherProps }) => (
  <div className={classes.Group}>
    <label className={classes.Label}>{label}</label>
    {message ? <small>{message}</small> : null}
    <input className={classes.FormInput} onChange={handleChange} {...otherProps} />
  </div>
);

export default formInput;
