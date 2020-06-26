import React from 'react'

const styles = {
  buttonStyle: {
    width: 160,
    height: 40,
    borderRadius: 7,
    backgroundColor: '#57A773',
    cursor: 'pointer',
    border: 'solid 0px',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Jost',
    fontSize: 16,
    color: 'white'
  },
  buttonText: {
    fontFamily: 'Jost',
    fontSize: 16,
    textAlign: 'center',
    color: 'white'
  }
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