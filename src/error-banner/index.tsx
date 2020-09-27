import React from 'react'
import { ApiErrorData } from '../data/types'

export const ErrorBanner = ({
  error,
  setError
}: {
  error: ApiErrorData | undefined
  setError: Function
}): JSX.Element | null => {
  if (!error || !error.message) {
    return null
  }
  return (
    <div className="error-banner">
      <div className="error-banner-content">
        An error occured. {error.message ? `Error details: ${error.message}` : ''}
        <button onClick={() => setError({ message: '' })}>
          <p className="visually-hidden">Close error</p>X
        </button>
      </div>
    </div>
  )
}
