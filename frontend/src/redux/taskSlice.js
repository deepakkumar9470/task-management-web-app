import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    tasks : [],
    loading: false
  };
  
  const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
      setCredentials: (state, action) => {
        
      },
    },
  });
  
  export const {} = taskSlice.actions;
  
  export default taskSlice.reducer;