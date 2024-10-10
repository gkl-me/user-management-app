import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import logout_icon from '../assets/logout.svg'
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { logoutAdmin } from '@/redux/slices/adminApiSlice';

const HeaderAdmin:React.FC = () => {

  const {users} = useAppSelector(state  => state.admin)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    async function logout() {
      await dispatch(logoutAdmin())
      navigate('/admin/login')
    }
    logout()
  }


    return (
      <>        
      <div className="flex justify-between items-center w-full h-20 px-32  shadow-sm shadow-blue-600">
          <div className="flex gap-5 items-center">
            <p className="text-2xl font-black font-poppins">
                <Link to={'/admin/login'}>Logo</Link>
            </p>
            <div className="flex gap-3">
              <p><Link to={'/admin/login'}>Home</Link></p>
              <p><Link to={'/admin/dashboard'}>Dashboard</Link></p>
            </div>            
          </div>
          {users && users.length!=0 && 
          <div className="flex gap-3 hover:cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="hover:shadow-[0_4px_12px_-1px_rgba(59,130,246,0.4)]">
              <AvatarImage src='/' />    
              <AvatarFallback className="text-black">Profile</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark">
            <DropdownMenuItem className="flex  gap-2" 
            onClick={handleLogout}>
            <img className="w-5 h-4" src={logout_icon} alt="" />
                Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
}
        </div>
      </>

      );
}

export default HeaderAdmin