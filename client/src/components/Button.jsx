import React from 'react'

const styles = {
  buttonStyle: {
    width: 160,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#57A773',
    fontSize: 16,
    color: 'black',
    cursor: 'pointer',
    border: 'solid 0px',
    marginRight: 10,
    marginBottom: 30,
    marginTop: 30,
    fontFamily: 'Jost',
  },
}

const Button = props => {
  const { title, className, type = 'button', onClick, disabled, style } = props
  let customStyle = {}
  if (style) {
    customStyle = { ...styles.buttonStyle, ...style }
  } else {
    customStyle = styles.buttonStyle
  }
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
      style={disabled ? { ...customStyle, opacity: 0.8 } : customStyle}
      disabled={disabled}
    >
      {title}
    </button>
  )
}

export default Button