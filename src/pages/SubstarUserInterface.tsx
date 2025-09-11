import React from 'react'
import LoginPage from './LoginPage'
import { Route, Routes } from 'react-router'
import SignupPage from './SignupPage'

function SubstarUserInterface() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} />
    </Routes>
  )
}

export default SubstarUserInterface