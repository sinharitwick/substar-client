import React from 'react'
import LoginPage from './LoginPage'
import { Route, Routes } from 'react-router'
import SignupPage from './SignupPage'
import CategoriesPage from './CategoriesPage'
import SubscriptionsPage from './SubscriptionsPage'

function SubstarUserInterface() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} />
      <Route path='categories' element={<CategoriesPage />} />
      <Route path='subscriptions/:category' element={<SubscriptionsPage />} />
    </Routes>
  )
}

export default SubstarUserInterface