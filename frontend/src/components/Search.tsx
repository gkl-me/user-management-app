import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import AddUserDialog from './AddUserDialog'
import { useAppDispatch } from '@/redux/store'
import { searchUser } from '@/redux/slices/adminApiSlice'

const Search:React.FC = () => {

  const [search,setSearch] = useState<string|undefined>()
  const dispatch = useAppDispatch();
  

  const handleSearch = () => {
      const getSearch = async () => {
        await dispatch(searchUser(search?{search}:undefined))
      }
      getSearch()
      setSearch("");
    }
  

  return (
    <div className='rounded-md flex justify-between items-center w-[90%] max-h-24 mt-20 shadow-sm shadow-blue-500 p-5'>
        <div className='flex gap-2'>
        <Input onChange={(e) => setSearch(e.target.value)} placeholder='search'/>
        <Button onClick={handleSearch} variant={'light'}>Search</Button>
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