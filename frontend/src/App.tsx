import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'

const App:React.FC = () => {
  return (
    <>
    <Toaster />
    <Outlet />
    </>
  )
}

export default App