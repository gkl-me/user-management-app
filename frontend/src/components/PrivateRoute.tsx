import { Navigate,Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/store";


import React from 'react'

const PrivateRoute:React.FC = () => {

    const {userInfo} = useAppSelector(state => state.auth)

  return (
    userInfo ? 
        <Outlet /> :
        <Navigate to={'/login'} replace />
  )
}

export default PrivateRoute