import HeaderAdmin from "@/components/HeaderAdmin";
import Search from "@/components/Search";
import SidePanel from "@/components/SidePanel";
import UserList from "@/components/UserList";
import React from "react";

const AdminDashBoard:React.FC = () => {
    return (
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