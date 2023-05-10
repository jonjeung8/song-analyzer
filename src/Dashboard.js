import React from 'react'
import useAuth from './useAuth'

export default function Dashboard({code}) {
  const access_token = useAuth(code)
  return <div>
      {code}
    </div>
}
