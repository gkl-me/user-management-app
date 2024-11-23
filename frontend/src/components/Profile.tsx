import React, { useEffect, useRef, useState } from 'react'
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
import { useGetProfileQuery, useUpdateMutation } from '@/redux/slices/usersApiSlice'
import Loading from './Loading'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { logout, setCredentials } from '@/redux/slices/authSlice'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { apiSlice } from '@/redux/slices/apiSlice'



const formSchema = z.object({
    name:z.string().min(3),
    email: z.string().email({ message: 'Invalid email' }),
    image: z.instanceof(File)
            .refine((file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type))
            .optional()
})

  const Profile: React.FC = () => {


    const [updateProfile,{isLoading:updateLoading}] = useUpdateMutation();

    
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    
    const { data: profileData, isLoading, error } = useGetProfileQuery(undefined,{
      refetchOnMountOrArgChange:true
    });
    
    const {userInfo} = useAppSelector(state => state.auth)

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues:{
          name:userInfo?.name,
          email:userInfo?.email,
          image: undefined  
      }
    })

    useEffect(() => {
      if (profileData) {
        form.reset({
          name: profileData.name,
          email: profileData.email
        });
        dispatch(setCredentials({ ...profileData }));
      }
    }, [profileData, form, dispatch]);
  
    
    useEffect(() => {
      if (error) {
        dispatch(logout());
        dispatch(apiSlice.util.resetApiState());
        navigate("/login");
        toast.error("Your account is not found. Please log in again.");
      }
    }, [error, dispatch, navigate]);
  
  
    const upload_ref = useRef<HTMLInputElement>(null)


    


  
    const [previewImage,setPreviewImage]= useState<string|null>(null);

    const handleUploadImage = (e:React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if(file){
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewImage(reader.result as string)
        }
        reader.readAsDataURL(file);
        form.setValue('image',file)
      }
    }

    const resetImageState = () => {
      form.setValue('image', undefined)
      if (upload_ref.current) {
        upload_ref.current.value = ''
      }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      console.log(values)
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        if (values.image) {
          formData.append('image', values.image);
        }
    
        const res = await updateProfile(formData).unwrap();
        dispatch(setCredentials({...res}))
        toast.success('Profile Updated')

        resetImageState();
      } catch (error) {
        form.reset()
      if(error && typeof error=='object' && 'data' in error){
        const errorMessage = error as { data?: { message?: string } };
        toast.error(errorMessage.data?.message)
      }else{
        toast.error('Something went wrong')
      }
    }
  }


  return (
    isLoading || updateLoading ? 
    <Loading/>
    :
    <div className="flex justify-around w-[90%]  m-auto my-10 p-10">
      <div className="py-5 flex flex-col justify-center items-center rounded-md shadow-sm shadow-blue-500 w-3/5">
        <div className="flex gap-10 items-center">
          <div>
          <Avatar className="dark size-28">
            <AvatarImage src={previewImage || userInfo.image} />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
          </div>
          <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold"></h1>
          <div className="flex gap-2">
            <Button 

            onClick={() => upload_ref.current?.click() }
            variant={"light"}>
              Upload Image
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
        name='image'
        render={({field}) => (
          <FormItem hidden>
            <FormLabel>Upload Image</FormLabel>
            <FormControl>
              <Input 
              ref={upload_ref}
              type='file' onChange={(e) => {
                handleUploadImage(e)
                field.onChange(e.target.files?.[0])
              }}/>
            </FormControl>
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
