import React from 'react';

const Input = ({
  id,
  type,
  label,
  value,
  onChange,
  disabled,
  isEmptyRequired,
  hasError,
  errorMessage
}) => (
  <div className="input-field">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={isEmptyRequired || hasError ? 'invalid' : ''}
      autoComplete="off"
    />
    <label
      htmlFor={id}
      className={value ? 'active' : null}
      data-error={errorMessage}
    >{label}</label>
  </div>
);

export default Input;
