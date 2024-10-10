import { createSlice } from "@reduxjs/toolkit"
import { addUser, deleteUser, editUser, getAllUsers, loginAdmin, logoutAdmin, searchUser } from "./adminApiSlice"

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AdminState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users') as string) : [],
    loading: false,
    error: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.users = [];
                state.error = action.payload as string;
                state.loading = false;
            })

            // Get all users cases
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Search user cases
            .addCase(searchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(searchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Add user cases
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Edit user cases
            .addCase(editUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete user cases
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Logout cases
            .addCase(logoutAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.users = [];
                state.loading = false;
            })
            .addCase(logoutAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default adminSlice.reducer;  