import React from 'react'


const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  form,
  ...props
}) => {
  console.log(form);
  return (
    <div>
      {props.label ||  <label>{props.label}</label>}
      <input type="text" {...field} {...props} />
      {touched[field.name] &&
        errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
  )};

  export default CustomInputComponent