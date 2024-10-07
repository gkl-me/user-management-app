import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import profile_icon from '../assets/profile.svg'
import logout_icon from '../assets/logout.svg'

const SecondHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full h-20 px-32  shadow-sm shadow-blue-600">
      <div className="flex gap-5 items-center">
        <p className="text-2xl font-black font-poppins">Logo</p>
        <div className="flex gap-3">
          <p>Home</p>
          <p>About Us</p>
          <p>Contact Me</p>
        </div>
      </div>
      <div className="flex gap-3 hover:cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="hover:shadow-[0_4px_12px_-1px_rgba(59,130,246,0.4)]">
              <AvatarImage src="" />    
              <AvatarFallback className="text-black">Profile</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark">
            <DropdownMenuLabel>
                
                My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex  gap-2 ">
            <img className="w-5 h-4" src={profile_icon} alt="" />
                Profile</DropdownMenuItem>
            <DropdownMenuItem className="flex  gap-2">
            <img className="w-5 h-4" src={logout_icon} alt="" />
                Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SecondHeader;
