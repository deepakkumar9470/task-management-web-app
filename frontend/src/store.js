import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice.js';
import taskReducer from './redux/taskSlice.js';
import { apiSlice} from './redux/apiSlice.js';
import { taskApi} from './redux/taskApi.js';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    auth: authReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
       .concat(apiSlice.middleware)
       .concat(taskApi.middleware),
  devTools: true,
});

export default store