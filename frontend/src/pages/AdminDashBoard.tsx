import HeaderAdmin from "@/components/HeaderAdmin";
import Loading from "@/components/Loading";
import Search from "@/components/Search";
import SidePanel from "@/components/SidePanel";
import UserList from "@/components/UserList";
import { getAllUsers, logoutAdmin } from "@/redux/slices/adminApiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminDashBoard:React.FC = () => {
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {users,loading,error} = useAppSelector(state => state.admin)

    useEffect(() => {
        const fetchUsers = async () => {
            await dispatch(getAllUsers());
        }
        fetchUsers();
        if(error){
            toast.error(error)
            async function logout() {
              await dispatch(logoutAdmin())
            }
            logout()
            navigate('/admin/login')
        }
    },[navigate,error,dispatch])

    return (
      loading ? <Loading/> :
        <>
          <HeaderAdmin />
          <div className="flex w-full">
            <SidePanel />
            <div className="flex flex-col w-full">
              <Search />
              <UserList />
            </div>
            </div>
        </>
      );
}

export default AdminDashBoard