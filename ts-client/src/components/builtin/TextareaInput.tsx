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
  onChange: React.ChangeEventHandler<HTMLInputElement> | any;
  disabled?: boolean;
  extraClass?: string;
  prefix?: React.ReactElement;
  dataTest?: string;
  rows: number
}

const TextareaInput: React.FC<Props> = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  onChange,
  disabled,
  extraClass,
  prefix,
  dataTest,
  rows
}) => {
  return (
    <div className='input-group'>
      {label && <label htmlFor={name}>{label}</label>}
      {prefix && (
        <div className='input-group-prepend'>
          <span className='input-group-text modal-prefix'>{prefix}</span>
        </div>
      )}
      <textarea
        data-test={dataTest}
        rows={rows}
        className={classnames(`form-control ${extraClass || ''}`, {
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

export default TextareaInput