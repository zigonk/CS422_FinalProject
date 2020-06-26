import React from 'react'

const Select = props => {
  const {
    className = '',
    name,
    required,
    label,
    disabled,
    field,
    form: { errors, setFieldValue },
    options = [],
    onChange,
    placeholder,
    style
  } = props
  return (
    <div className={`form-group mt-3 mb-3 input-group ${className}`}>
      <label className='label label-select'>
        {label}
        {required && <span>*</span>}
      </label>
      <select
        className='custom-select w-100'
        name={name}
        disabled={disabled}
        onChange={option => {
          setFieldValue(field.name, option.target.value)
          if (onChange) {
            onChange(option.target.value)
          }
        }}
        onBlur={field.onBlur}
        id={field.name}
        value={(field.value !== undefined && field.value !== null) ? field.value : ''}
        required={required}
        style={field.value === '' ? { ...style } : null}
      >
        <option value='' disabled key='choose'>
          {placeholder || 'Choose...'}
        </option>
        {options.map((item, i) => (
          <option key={i} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
      <span className='error-message'>
        {errors && errors[field.name]}
      </span>
    </div>
  )
}

export default Select