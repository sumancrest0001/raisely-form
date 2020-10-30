import React from 'react';
import classes from './FormInput.module.css';

const formInput = ({ handleChange, label, ...otherProps }) => (
  <div className={classes.Group}>
    <label className={classes.Label}>{label}</label>
    <input className={classes.FormInput} onChange={handleChange} {...otherProps} />
  </div>
);

export default formInput;
