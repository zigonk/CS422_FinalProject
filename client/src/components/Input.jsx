import React from 'react'


const styles = {
  formWrapper: {
    marginTop: 10,
  },
  labelInput: {
    display: 'block',
    color: 'white',
    marginTop: 10,
    marginBottom: 10
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    height: 40,
    fontSize: 16,
    paddingLeft: 20,
    fontFamily: 'Jost',
    border: '1px solid #DDDDDD',
    borderRadius: '4px',
    marginBottom: 10
  },
  errorMessage: {
    display: 'block',
    fontSize: 14,
    color: 'red'
  }
}

const Input = props => {
  const {
    name,
    required,
    label,
    type = 'text',
    placeholder = '',
    disabled,
    field,
    min,
    max,
    form: { touched, errors }
  } = props

  return (
    <div style={styles.formWrapper}>
      <label style={styles.labelInput}>
        {label}
        {required && <span>*</span>}
      </label>
      <input
        style={styles.input}
        name={name}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onChange={field.onChange}
        onBlur={field.onBlur}
        id={field.name}
        value={field.value}
        required={required}
        min={min}
        max={max}
      />
      <span style={styles.errorMessage}>
        {touched[field.name] && errors[field.name]}
      </span>
    </div>
  )
}

export default Input