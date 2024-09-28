

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
 
  token: "",
 

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      state.token = action.payload;
    },
  
   
   
   
  },
});

export const {
  handleLogin,
 
} = authSlice.actions;

export default authSlice.reducer;
