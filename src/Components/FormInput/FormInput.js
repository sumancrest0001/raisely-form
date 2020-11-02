import React from 'react';
import classes from './FormInput.module.css';

const formInput = ({ handleChange, label, validity, message, touched, ...otherProps }) => {
  const cssClasses = [classes.FormInput, classes.Input];
  console.log(validity);
  if (!validity && touched) {
    cssClasses.pop();
    cssClasses.push(classes.Invalid);
  }

  return (
    <div className={classes.Group}>
      <label className={classes.Label}>{label}</label>
      {message ? <small>{message}</small> : null}
      <input className={cssClasses.join(' ')} onChange={handleChange} {...otherProps} />
    </div>
  );
}

export default formInput;
