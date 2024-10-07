import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'

import google_icon from '../assets/google.svg'
import web_icon from '../assets/spider-web.svg'
import { Link } from 'react-router-dom'


const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
})

const Login: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        email: '',
      password: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Replace with your actual login logic
      console.log('Form Submitted:', values)
      // Example: await loginAPI(values)
    } catch (error) {
      console.error('Login failed:', error)
      // Optionally set a global error message
    }
  }

  return (
    <div className=' flex justify-between w-[60%] m-auto mt-20 p-10 shadow-sm rounded-md shadow-blue-400'>
        
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-4/6 p-4  ">
      <div className=''>
        <span className='flex justify-center mb-1 text-lg font-bold text-blue-500'>Welcome to Login Page</span>
            <Button type='button' variant={'light'} className='w-full'>
                <img className='w-4 h-4'  src={google_icon} alt="" />
                Login with Google</Button>
        </div>
        <div className="flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">Or</span>
            <hr className="flex-grow border-t border-gray-300" />
            </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className='text-sm flex justify-end hover:text-blue-600 hover:cursor-pointer'>
            Forgot password?
        </div>
        <Button variant={'blue'} type="submit">Login</Button>
        <div className="flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">Or</span>
            <hr className="flex-grow border-t border-gray-300" />
        </div>
        <div className='text-sm flex justify-center gap-1'>
            Dont have an account? 
            <Link to={'/signup'}>
            <span className=' hover:text-blue-600 hover:cursor-pointer'> Sign Up</span>
            </Link>
        </div>
      </form>
    </Form>
    <div className='w-1/2'>
        <img className='w-[70%] h-[80%]' src={web_icon} alt="" />
        </div>
    </div>
  )
}

export default Login
