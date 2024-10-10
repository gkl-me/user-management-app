import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'

const addUserSchema  = z.object({
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
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const editUserSchema = z.object({
    name:z.string().min(3,{message:"Name should atleast contain 3 char"}),
    email:z.string().email({message:"Please enter valid email"})
})

export type adduserType = z.infer<typeof addUserSchema>
export type editUserType = z.infer<typeof editUserSchema>

export type UserFormData = z.infer<typeof addUserSchema> | z.infer<typeof editUserSchema>


interface UserFormProps {
    onSubmit: (data: UserFormData) => void,
    initialData?:Partial<UserFormData> | null,
    formType:'add' | 'edit'
}

const UserForm:React.FC<UserFormProps> = ({onSubmit,initialData = null,formType='add'}) => {

    const schema = formType === 'add' ? addUserSchema : editUserSchema;

    const form = useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema),
        defaultValues: initialData || {
            name:'',
            email:'',
            ...(formType==='add'? {password:'',confirmPassword:""}:{})
        }
    })

  return (
    <div>
    <Form {...form}>
        <form className='flex flex-col gap-2' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
                control={form.control}
                name='name'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder='name' {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control}
                name='email'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder='email' {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            {formType === 'add' && (
                <>
                    <FormField 
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='password' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name='confirmPassword'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='confirm password' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </>
            )}
            <Button className='mt-3' variant={'blue'} type='submit'>{formType==='add'?'Add User':'Update User'}</Button>
        </form>
    </Form>
    </div>
  )
}

export default UserForm