import React, { useEffect } from 'react'

const Alert = ({type, msg, showAlert, list}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // NOTE: By default show alert is false
      showAlert()
    }, 3000)
    return () => clearTimeout(timeout)
  }, [list, showAlert])
  return <p className={`alert alert-${type}`}>
    {msg}
  </p>
}

export default Alert
