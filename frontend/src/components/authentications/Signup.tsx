import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent'
import { FormInputText } from '../utils/FormInputText';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query'
import Swal from 'sweetalert2'
import axios from 'axios';

const loginInputText = [
    {name: "username", label: "Username", type: "text", minLength: 3},
    {name: "email", label: "Email", type: "text", minLength: 3},
    {name: "password", label: "Password", type: "password", minLength: 8},
    {name: "confirmPassword", label: "Confirm password", type: "password", minLength: 8}
]

interface NewUser{
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

interface NewUserSubmit{
    username: string,
    email: string,
    password: string,
}

const Signup = () => {

    const queryClient = useQueryClient()

    const { control, handleSubmit } = useForm<NewUser>();

    const postNewUser = async(newUser: NewUserSubmit)=>{
        const url = 'http://localhost:3000/api/signup'
        return await axios.post<NewUserSubmit>(url, newUser, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }

    const newUserMutation = useMutation(postNewUser, {
        onSuccess: ()=>{
            queryClient.invalidateQueries();
            Swal.fire({
                title: 'You are sign up!',
                icon: 'success'
            });
        },
        onError: ()=>{
            Swal.fire({
                title: 'Something bad happened',
                icon: 'error'
            });
        }
    })

    const submit = (data: NewUser)=>{
        if(data.password === data.confirmPassword){
            newUserMutation.mutate({username: data.username, email: data.email,  password: data.password})
        }
    }

    return(
        <Card>
            <CardContent>
                {
                    loginInputText.map((input)=>(
                        <FormInputText key={input.name} name={input.name} label={input.label} control={control} type={input.type} minLength={input.minLength}/>
                    ))
                }
            </CardContent>
            <CardActions sx={{display:'flex', justifyContent:'center', mb: 2}}>
                <Button variant='contained' onClick={handleSubmit(submit)}>Sign up</Button>
            </CardActions>
        </Card>
    )
}

export default Signup