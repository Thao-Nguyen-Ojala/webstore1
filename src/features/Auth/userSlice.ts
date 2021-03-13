import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import {resgisterFormType, logInFormType} from '../../interfaces'

interface UserState {
  current: {},
  settings: {}
}

const initialState: UserState = {
  current: {},
  settings: {}
}

export const register = createAsyncThunk(
  'users/register',
  async (payload:resgisterFormType) => {
    const res = await userApi.register(payload);
    console.log(res)
    //save data to local storage

    localStorage.setItem('access_token', res.data.jwt);
    localStorage.setItem('user', JSON.stringify(res.data.user))
    return res.data.user
  }
)

export const logIn = createAsyncThunk(
  'users/register',
  async (payload:logInFormType) => {
    const res = await userApi.logIn(payload);
    console.log(res)
    //save data to local storage

    localStorage.setItem('access_token', res.data.jwt);
    localStorage.setItem('user', JSON.stringify(res.data.user))

    return res.data.user
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<any>) => {
      state.current = action.payload
    }
  },
  /*
  extraReducers: builder => {
    function sharedReducer(state: any, action: any) {
      state.current = action.payload
    }
    builder.addCase(register.fulfilled, sharedReducer).addCase(logIn.fulfilled, sharedReducer) 
    builder.addCase(register.fulfilled, (state, action) => {
      state.current = action.payload
    })

    builder.addCase(logIn.fulfilled, (state, action) => {
      state.current = action.payload
   
  })
}*/
})

export const { updateUser } = userSlice.actions
const {reducer} = userSlice;
export default reducer