import React from 'react';
import { HOC } from 'formsy-react';

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

const adaptInput = (InputComponent) =>
  ({
    name,
    type,
    label,
    getValue,
    setValue,
    isFormDisabled,
    showRequired,
    showError,
    getErrorMessage
  }) => (
    <InputComponent
      id={name}
      type={type}
      label={label}
      value={getValue()}
      onChange={e => setValue(e.target.value)}
      disabled={isFormDisabled()}
      isEmptyRequired={showRequired()}
      hasError={showError()}
      errorMessage={getErrorMessage()}
    />
  );

export default HOC(adaptInput(Input));