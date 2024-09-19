import { apiSlice } from './apiSlice';
const url = 'http://localhost:5000/';
const HOSTET_URL = 'https://task-management-web-app-pv5h.onrender.com';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
       login:builder.mutation({
        query:(data)=>({
            url : `${HOSTET_URL}/api/user/login`,
            method : 'POST',
            body : data
        }),
       }),
       logout:builder.mutation({
        query:(data)=>({
            url : `${HOSTET_URL}/api/user/logout`,
            method : 'POST',
        }),
       }),
       registerUser:builder.mutation({
        query:(data)=>({
            url : `${HOSTET_URL}/api/user/register`,
            method : 'POST',
            body : data
        }),
       }),
    }),
})

export const {useLoginMutation,useLogoutMutation,useRegisterUserMutation} = userApiSlice