import axiosClient from "./axiosClient";
import { resgisterFormType, logInFormType } from "../interfaces";


const userApi = {
  register(data: resgisterFormType) {
    const url = '/auth/local/register';
    return axiosClient.post(url,data)
  },
  
  logIn(data: logInFormType) {
    const url = '/auth/local';
    return axiosClient.post(url,data)
  }
};

export default userApi