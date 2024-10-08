import { useAppSelector } from '@/redux/store'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouteAdmin:React.FC = () => {


    const {users} = useAppSelector(state => state.admin)

  return (
    (users) ? 
    <Outlet/> : <Navigate to={'/admin/login'} replace />
  )
}

export default PrivateRouteAdmin