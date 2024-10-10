import React, {  useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import UserForm, { adduserType, UserFormData } from './UserForm'
import { addUser } from '@/redux/slices/adminApiSlice'
import { useAppDispatch } from '@/redux/store'
import { toast } from 'sonner'

const AddUserDialog = ({children}:{children:React.ReactNode}) => {

  const [open,setOpen] = useState(false)

  const dispatch = useAppDispatch();

  
  const handleSubmit = async (data:UserFormData) => {
    const userData = data as adduserType;
    const res = await dispatch(addUser({name:userData.name,email:userData.email,password:userData.password,confirmPassword:userData.confirmPassword}))
    if(addUser.fulfilled.match(res)){
      setOpen(false)
      toast.success('User added successfully')
    }
  }
    

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='dark'>
        <DialogHeader>
          <DialogTitle>Add a new user</DialogTitle>
        </DialogHeader>
        <UserForm onSubmit={handleSubmit} formType='add'/>
      </DialogContent>
    </Dialog>
  )
}

export default AddUserDialog