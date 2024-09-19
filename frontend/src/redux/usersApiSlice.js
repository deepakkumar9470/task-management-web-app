import { apiSlice } from './apiSlice';
// const USERS_URL = '/api/user';
// const AUTH_URL = process.env.REACT_API_URL

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
       login:builder.mutation({
        query:(data)=>({
            url : `/api/user/login`,
            method : 'POST',
            body : data
        }),
       }),
       logout:builder.mutation({
        query:(data)=>({
            url : `/api/user/logout`,
            method : 'POST',
        }),
       }),
       registerUser:builder.mutation({
        query:(data)=>({
            url : `http://localhost:5000/api/user/register`,
            method : 'POST',
            body : data
        }),
       }),
    }),
})

export const {useLoginMutation,useLogoutMutation,useRegisterUserMutation} = userApiSlice