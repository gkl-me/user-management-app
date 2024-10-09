import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
  

const AddUserDialog = ({children}:{children:React.ReactNode}) => {

    const [change,setChange] = useState(false)

  return (
    <>
        <Dialog open={change} onOpenChange={setChange}>
  <DialogTrigger>{children}</DialogTrigger>
  <DialogContent className='dark'>
    <DialogHeader>
      <DialogTitle>Add a new user?</DialogTitle>
      <div className='p-3 flex flex-col gap-3'>
        <Label>Name</Label>
        <Input placeholder='name'/>
        <Label>Email</Label>
        <Input placeholder='email'/>
        <Label>Password</Label>
        <Input type='password' placeholder='password'/>
        <div className='mt-3 flex gap-3'>
            <Button onClick={() => setChange(false)} variant={'light'}>Close</Button>
            <Button variant={'blue'}>Add User</Button>
        </div>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </>
  )
}

export default AddUserDialog