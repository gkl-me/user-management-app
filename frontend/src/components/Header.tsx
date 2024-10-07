import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center w-full h-20 px-32  shadow-sm shadow-blue-600">
      <div className="flex gap-5 items-center">
        <Link to={'/'}>
        <p className="text-2xl font-black font-poppins">Logo</p>
        </Link>
        <div className="flex gap-3">
          <Link to={'/'}>
          <p>Home</p>
          </Link>

          <p>About Us</p>
          <p>Contact Me</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Link to={'/login'}>
        <Button size={"lg"} variant={"light"} className="">
          Login
        </Button>
        </Link>
        <Link to={'/signup'}>
        <Button size={"lg"} variant={"blue"} className="">
          SignUp
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
