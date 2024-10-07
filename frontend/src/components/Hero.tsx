import React from 'react'
import { Button } from './ui/button'
import web_icon from '../assets/spider-web.svg'
import { Link } from 'react-router-dom'


const Hero:React.FC = () => {
  return (
    <div className='flex w-[80%] m-auto mt-20 p-20 '>
        <div className='flex flex-col gap-4 mt-4'>
            <h1 className='text-6xl font-poppins font-extrabold'>Welcome To Home Page</h1>
            <h1 className='text-gray-400 text-3xl font-thin'>This is the home page </h1>
            <div className='flex gap-3'>
            <Link to={'/login'}>
            <Button variant={'light'} size={'lg'}>Login</Button>
            </Link>
            <Link to={'signup'}>
            <Button variant={'blue'} size={'lg'}>SignUp</Button>
            </Link>
            </div>
        </div>
        <div className='w-2/3'>
        <img className='w-[70%] h-[85%]' src={web_icon} alt="" />
        </div>
        <div>

        </div>
    </div>
  )
}

export default Hero