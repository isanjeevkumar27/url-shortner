import React from 'react'

function Error({ message }) {
  return (
    <span className="text-red-500">
      {message}
    </span>
  )
}

export default Error