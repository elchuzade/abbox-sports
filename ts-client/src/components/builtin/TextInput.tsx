import React from 'react'
import classnames from 'classnames'

interface Props {
  name: string;
  placeholder?: string;
  value: string | number;
  label?: string;
  error?: string;
  info?: string;
  type?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  extraClass?: string;
  prefix?: React.ReactElement;
  dataTest?: string;
}

const TextInput: React.FC<Props> = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  extraClass,
  prefix,
  dataTest
}) => {
  return (
    <div className='input-group'>
      {label && <label htmlFor={name}>{label}</label>}
      {prefix && (
        <div className='input-group-prepend'>
          <span className='input-group-text'>{prefix}</span>
        </div>
      )}
      <input
        data-test={dataTest}
        type={type}
        className={classnames(`form-control ${extraClass}`, {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <div className='invalid-feedback'>{error}</div>}
      {info && <small className='form-text text-muted'>{info}</small>}
    </div>
  )
}

export default TextInput