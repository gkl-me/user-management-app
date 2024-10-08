import HeaderAdmin from "@/components/HeaderAdmin";
import Loading from "@/components/Loading";
import Search from "@/components/Search";
import SidePanel from "@/components/SidePanel";
import UserList from "@/components/UserList";
import { getAllUsers } from "@/redux/slices/adminApiSlice";
import { clearError } from "@/redux/slices/adminSlice";
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
        const res = await dispatch(getAllUsers());
    
        if (getAllUsers.fulfilled.match(res)) {
          // toast.success('Users successfully fetched');
        }
      };
    
      fetchUsers();
    }, [dispatch, navigate]);

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearError()); 
      }
    }, [error, dispatch,navigate]);

    return (
      loading ? <Loading/> :
        <>
          <HeaderAdmin />
          <div className="flex w-full">
            <SidePanel />
            <div className="flex flex-col w-full">
              <Search />
              <UserList users={users} />
            </div>
            </div>
        </>
      );
}

export default AdminDashBoard