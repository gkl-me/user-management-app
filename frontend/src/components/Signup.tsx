import React, { useEffect } from 'react'
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
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { useRegisterMutation } from '@/redux/slices/usersApiSlice'
import { setCredentials } from '@/redux/slices/authSlice'
import Loading from './Loading'
import { toast } from 'sonner'


const formSchema = z.object({
    name:z.string().min(3),
    email: z.string().email({ message: 'Invalid email' }),
    password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
    confirmPassword:z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // This specifies where the error message should appear
    message: 'Passwords do not match',
  });

const Signup: React.FC = () => {

    const {userInfo} = useAppSelector(state => state.auth)
    
    const [register,{isLoading}] = useRegisterMutation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(userInfo){
            navigate('/profile')
        }
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        name:"",
        email: '',
      password: '',
      confirmPassword:''    
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await register(values).unwrap()
      dispatch(setCredentials({...res}));
      navigate('/profile')
    } catch (error) {
        if(error && typeof error=='object' && 'data' in error){
            const errorMessage = error as { data?: { message?: string } };
            toast.error(errorMessage.data?.message)
        }else{
            toast.error('Something went wrong')
        }
    }
  }

  return (

    isLoading ? 
    <Loading /> :
    <div className=' flex justify-between w-[60%] m-auto my-20 p-10 shadow-sm rounded-md shadow-blue-400'>
    
    <div className='w-1/2'>
        <img className='w-[70%] h-[80%]' src={web_icon} alt="" />
        </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-4/6 p-4  ">
      <div className=''>
        <span className='flex justify-center mb-1 text-lg font-bold text-blue-500'>Welcome to SignUp Page</span>
            <Button type='button' variant={'light'} className='w-full'>
                <img className='w-4 h-4'  src={google_icon} alt="" />
                Sign up with Google</Button>
        </div>
        <div className="flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">Or</span>
            <hr className="flex-grow border-t border-gray-300" />
            </div>

        <FormField 
        control={form.control}
        name='name'
        render={({field}) => (
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input placeholder='Name' {...field} />
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
        />
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
        <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <Button variant={'blue'} type="submit">Sign Up</Button>
        <div className="flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">Or</span>
            <hr className="flex-grow border-t border-gray-300" />
        </div>
        <div className='text-sm flex justify-center gap-1'>
            Already have an account? 
            <Link to={'/login'}>
            <span className=' hover:text-blue-600 hover:cursor-pointer'>Login</span>
            </Link>
        </div>
      </form>
    </Form>
    </div>
  )
}

export default Signup
