import React from 'react';
import { HOC } from 'formsy-react';

const Input = ({
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
  <div className="input-field">
    <input
      id={name}
      type={type}
      value={getValue()}
      onChange={e => setValue(e.target.value)}
      disabled={isFormDisabled()}
      className={showRequired() || showError() ? 'invalid' : ''}
      autoComplete="off"
    />
    <label
      htmlFor={name}
      className={getValue() ? 'active' : null}
      data-error={getErrorMessage()}
    >{label}</label>
  </div>
);

export default HOC(Input);