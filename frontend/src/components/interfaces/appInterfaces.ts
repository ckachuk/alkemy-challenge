
export interface NewUser{
    username: string,
    email: string,
    password: string,
    confirmPassword?: string
   
}

export interface ServerResponseSignUp {
    data: string,
    status?: string,
    message?: string
}


export interface User {
    username: string,
    password: string
}
  
export interface ServerResponseLogin{
    status?: string,
    message?: string,
    token?: string,
    user?: object
}


