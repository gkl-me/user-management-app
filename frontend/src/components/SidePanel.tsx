import React from 'react'

const SidePanel:React.FC = () => {
  return (
    <div className='rounded-md w-[20%] min-h-44 mx-10 my-20 shadow-sm shadow-blue-500 p-5'>
        <h1 className='text-xl font-bold text-center'>Admin Side</h1>
        <hr className='border-t border-gray-600 my-5'/>
        <div className='p-2 rounded-sm cursor-pointer w-full bg-blue-900 hover:bg-[#070529] text-center text-lg'>
            <span className=''>Users</span>
        </div>
    </div>
  )
}

export default SidePanel