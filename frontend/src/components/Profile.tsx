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
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'


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

  const Profile: React.FC = () => {
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
      // Replace with your actual login logic
      console.log('Form Submitted:', values)
      // Example: await loginAPI(values)
    } catch (error) {
      console.error('Login failed:', error)
      // Optionally set a global error message
    }
  }


  return (
    <div className="flex justify-around w-[90%]  m-auto my-10 p-10">
      <div className="py-5 flex flex-col justify-center items-center rounded-md shadow-sm shadow-blue-500 w-3/5">
        <div className="flex gap-10 items-center">
          <div>
          <Avatar className="dark size-28">
            <AvatarImage src="/" />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
          </div>
          <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">User Name</h1>
          <div className="flex gap-2">
            <Button variant={"light"}>
              Upload Image
            </Button>
            <Button variant={"destructive"}>
              Delete Image
            </Button>
          </div>
        </div>
        </div>
        
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-4/6 p-4  ">
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
        <Button variant={'blue'} type="submit">Update</Button>
      </form>
    </Form>
      </div>
    </div>
  );
};

export default Profile;
