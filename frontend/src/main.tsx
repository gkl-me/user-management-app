import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from 'react-router-dom'
import './index.css'
import LandingPage from './pages/LandingPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'

import { Provider } from 'react-redux'
import store from './redux/store.ts'
import PrivateRoute from './components/PrivateRoute.tsx'
import AdminLogin from './pages/AdminLoginPage.tsx'
import AdminDashBoard from './pages/AdminDashBoard.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<LandingPage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage/>} />

      {/* private routes */}

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<ProfilePage/>} /> 
      </Route>
      <Route path='/admin'>
        <Route index element={<Navigate to={'login'} replace/>} />
        <Route path='login' element={<AdminLogin/>}/>
        <Route path='dashboard' element={<AdminDashBoard/>}/>
      </Route>
    </Route>
  )
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>

    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
