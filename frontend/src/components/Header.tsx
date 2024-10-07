import React from "react";
import { Button } from "./ui/button";

const Header: React.FC = () => {
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
      <div className="flex gap-3">
        <Button size={"lg"} variant={"light"} className="">
          Login
        </Button>
        <Button size={"lg"} variant={"blue"} className="">
          SignUp
        </Button>
      </div>
    </div>
  );
};

export default Header;
