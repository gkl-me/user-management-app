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
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { loginAdmin } from '@/redux/slices/adminApiSlice'
import Loading from './Loading'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { clearError } from '@/redux/slices/adminSlice'



const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
})

const LoginAdmin: React.FC = () => {

    const navigate = useNavigate()
    
    const dispatch = useAppDispatch()
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    defaultValues:{
        email: '',
      password: '',
    }
})

    const { reset } = form;
    const {loading, error} = useAppSelector(state => state.admin)

    useEffect(() => {
      if(error) toast.error(error)
        reset();
      dispatch(clearError())
    },[error,reset,dispatch])

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await dispatch(loginAdmin(values))
    if(loginAdmin.fulfilled.match(res)){
      navigate('/admin/dashboard')
    }
}



  return (
    loading ? <Loading/> :
    <div className='flex-col items-center flex w-[45%] justify-center m-auto mt-20 p-10 shadow-sm rounded-md shadow-blue-400'>
        <div className='text-2xl font-extrabold '>Admin Login</div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-4/6 p-4  ">
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
        <Button variant={'blue'} type="submit">Login</Button>
      </form>
    </Form>
    </div>
  )
}

export default LoginAdmin
