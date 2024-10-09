import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import AddUserDialog from './AddUserDialog'

const Search:React.FC = () => {
  return (
    <div className='rounded-md flex justify-between items-center w-[90%] max-h-24 mt-20 shadow-sm shadow-blue-500 p-5'>
        <div className='flex gap-2'>
        <Input placeholder='search'/>
        <Button variant={'light'}>Search</Button>
        </div>
        <div>
            <AddUserDialog>

            <Button variant={'blue'}>Add User</Button>
            </AddUserDialog>
        </div>
    </div>
  )
}

export default Search