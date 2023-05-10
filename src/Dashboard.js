import React from 'react'
import useAuth from './useAuth'
import { Container } from 'react-bootstrap'

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  return <div>
      {code}
    </div>
}
