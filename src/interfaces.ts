export interface resgisterFormType {
  email: string,
  password: string,
  retypePassword?: string;
  fullName: string,
  username?: string;
}

export interface logInFormType {
  email?: string,
  password: string,
  username?: string;
}