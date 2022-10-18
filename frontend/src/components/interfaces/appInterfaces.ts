
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

export interface ICategories{
    categories: Array<ObjectCategory>,
}


export interface ObjectCategory{
    id: string, 
    name: string
}

export interface CategoryProps{
    category: ObjectCategory
}

export interface CategoryActionsProps{
    categoryId: string
}

export interface ServerResponseDeleteCategory{
    data:{
      status: string,
      message: string
    }
}

export interface Operation{
    id: string,
    concept: string,
    amount: number,
    type: string,
    date: Date,
    category: {
      id: string,
      name: string
    }
}
  
export interface OperationsTable{
    id:string,
    concept:string,
    amount: number,
    type: string,
    date: Date,
    category: string,
    operationId: string
}

export interface ServerResponseCreateCategory{
    status?: string,
    message?: string,
}

export interface Category{
    name: string
}