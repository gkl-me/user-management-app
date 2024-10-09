import React from 'react'

const HeaderAdmin:React.FC = () => {
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
        </div>
      );
}

export default HeaderAdmin