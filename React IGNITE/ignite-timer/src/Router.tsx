import { Route, Routes } from 'react-router-dom'
import React from 'react'

import { DefaultLayout } from './layout/DefaultLayout'
import { Home } from './Pages/Home'
import { History } from './Pages/History'

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
      </Route>
    </Routes>
  )
}
