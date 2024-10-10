import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

const adminApi = axios.create({
    baseURL:'/api/admin',
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials:true
})




export const loginAdmin = createAsyncThunk(
    'admin/login',
    async (data: { email: string; password: string },{rejectWithValue}) => {
        try {
            const res = await adminApi.post('/login', data);    
            localStorage.setItem('users',JSON.stringify(res.data.users))
            return res.data.users;
        } catch (error:unknown) {
            if(error instanceof AxiosError){
                return rejectWithValue(error?.response?.data.message);
            }
        }
    }
);


export const getAllUsers = createAsyncThunk(
    'admin/getUsers',
    async (_,{rejectWithValue}) => {
        try {
            const res = await adminApi.get('/users')
            return res.data.users
        } catch (error) {
            if(error instanceof AxiosError){
                return rejectWithValue(error?.response?.data.message)
            }
        }
    }
)

export const searchUser = createAsyncThunk(
    'admin/searchUser',
    async(data:{search:string}|undefined,{rejectWithValue}) => {
        if(data?.search){
            try {
                const res = await adminApi.get(`/users/search?search=${data.search}`)
                return res.data.users
            } catch (error) {
                if(error instanceof AxiosError){
                    return rejectWithValue(error?.response?.data.message)
                }
            }
        }else{
            try {
                const res = await adminApi.get(`/users/search?search=`)
                return res.data.users
            } catch (error) {
                if(error instanceof AxiosError){
                    return rejectWithValue(error?.response?.data.message)
                }
            }

        }
    }
)

export const addUser = createAsyncThunk(
    'admin/addUser',
    async(data:{name:string,email:string,password:string,confirmPassword:string},{rejectWithValue}) => {
        try {
            const res = await adminApi.post('/add',data)
            return res.data.users
        } catch (error) {
            console.log(error)
            if(error instanceof AxiosError){
                return  rejectWithValue(error?.response?.data.message)
            }
        }
    }
)

interface editPayload {
    id:string,
    userData: {
        name?:string,
        email?:string
    }
}


export const editUser = createAsyncThunk(
    'admin/editUser',
    async({id,userData}:editPayload,{rejectWithValue}) => {
        try {
            const res =await adminApi.put(`/edit/${id}`,userData);
            return res.data.users
        } catch (error) {
            if(error instanceof AxiosError){
                return  rejectWithValue(error?.response?.data.message)
            }
        }
    }
)

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async({id}:{id:string},{rejectWithValue}) => {
        try {
            const res = await adminApi.delete(`/delete/${id}`)
            return res.data.users
            
        } catch (error) {
            if(error instanceof AxiosError){
                return rejectWithValue(error?.response?.data.message)
            }
        }
    }
)

export const logoutAdmin = createAsyncThunk(
    'admin/logout',
    async(_,{rejectWithValue}) => {
        try {
            const res = await adminApi.post('/logout')
            localStorage.removeItem('users')
            return res.data.message
        } catch (error) {
            if(error instanceof AxiosError){
                return  rejectWithValue(error?.response?.data.message)
            }
        }
    }
)

