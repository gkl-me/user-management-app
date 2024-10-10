import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import UserForm, { editUserType } from './UserForm'
import { useAppDispatch } from '@/redux/store'
import { editUser } from '@/redux/slices/adminApiSlice'
import { toast } from 'sonner'

interface userType extends editUserType {
    _id:string
}

const EditUserDialog = ({children,user}:{user:userType,children:React.ReactNode}) => {

  const [open,setOpen] = useState(false)

  const dispatch = useAppDispatch();

  const handleSubmit = async (data:editUserType) => {
    const res = await dispatch(editUser({id:user._id,userData:{name:data.name,email:data.email}}))
    if(editUser.fulfilled.match(res)) {
      toast.success('User updated successfully')
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='dark'>
        <DialogHeader>
          <DialogTitle>Add a new user</DialogTitle>
        </DialogHeader>
        <UserForm onSubmit={handleSubmit} initialData={user} formType='edit'/>
      </DialogContent>
    </Dialog>
  )
}

export default EditUserDialog