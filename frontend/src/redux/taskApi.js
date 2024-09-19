import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const url = 'http://localhost:5000/';
const HOSTET_URL = 'https://task-management-web-app-pv5h.onrender.com'

export const taskApi = createApi({
    reducerPath : 'taskapi',
    baseQuery :fetchBaseQuery({
        baseUrl : HOSTET_URL
    }),
    endpoints :(builder)=>({
        getAllTasks : builder.query({
            query :({userId,status, priority, sortBy = 'asc'})=>({
             url:`/api/task`,
             method :'GET',
             params :{ 
                userId,
                status,
                priority,
                sortBy, },
            })
        }),
        getTaskById : builder.query({
            query :(id)=>({
             url:`/api/task/${id}`,
             method :'GET',
            credentials: 'include',
            })
        }),
        createTas : builder.mutation({
            query :(newTask)=>({
             url:`/api/task/create`,
             method :'POST',
             body:newTask,
             headers :{
                'Content-type' : 'application/json',
             },
             credentials: 'include',
            })
        }),
        updateTask : builder.mutation({
            query :({ id, ...data })=>({
             url:`/api/task/${id}`,
             method :'PUT',
             body:data,
             headers :{
                'Content-type' : 'application/json',
             },
             credentials: 'include',
            })
        }),
        deleteTaskById : builder.mutation({
            query :(id)=>({
             url:`/api/task/${id}`,
             method :'DELETE',
             credentials: 'include',
            })
        })
    })
})

export const {
    useGetAllTasksQuery,
    useGetTaskByIdQuery,
    useCreateTasMutation,
    useUpdateTaskMutation,
    useDeleteTaskByIdMutation} = taskApi;