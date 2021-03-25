import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import { StorageKeys } from "../../constants/storage-keys";
import { logInFormType, resgisterFormType, UserState, UserLoggedOut } from '../../interfaces';



const userStorageData = localStorage.getItem(StorageKeys.USER)
const initialState: UserState = {
  current: userStorageData ? JSON.parse(userStorageData) : {},
  settings: {}
}

export const register = createAsyncThunk(
  'user/register',
  async (payload:resgisterFormType) => {
    const res = await userApi.register(payload);
    //save data to local storage

    localStorage.setItem(StorageKeys.TOKEN, res.data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(res.data.user))
    return res.data.user
  }
)

export const logIn = createAsyncThunk(
  'user/login',
  async (payload:logInFormType) => {
    const res = await userApi.logIn(payload);
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
    logout: (state: UserState | undefined) => {
      localStorage.removeItem(StorageKeys.USER)
      localStorage.removeItem(StorageKeys.TOKEN)
      state = undefined
    }
  },
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.current = action.payload
    })
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.current = action.payload
    })
}
})

const {actions, reducer} = userSlice;
export const {logout} = actions
export default reducer