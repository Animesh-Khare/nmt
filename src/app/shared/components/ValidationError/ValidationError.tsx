import React from 'react'

const ValidationError:React.FC<{validationMessage:string}> = ({validationMessage}) => {
  return (
    <div style={{color: 'red',
        'fontSize': '13px',
        'margin': 0,
        'padding': 0}}>{validationMessage}</div>
  )
}

export default ValidationError