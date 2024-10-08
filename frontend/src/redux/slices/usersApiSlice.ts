import { USERS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (bulider) => ({
        login: bulider.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body:data
            })
        }),
        register: bulider.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body:data
            })
        }),
        logout: bulider.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        update: bulider.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body:data
            })
        }),
        getProfile : bulider.query({
            query: () => ({
                url: `${USERS_URL}/profile`,
            })
        })
    })
})


export const { useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateMutation,useGetProfileQuery } = userApiSlice;