import React from 'react'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent'
import { FormInputText } from '../utils/FormInputText';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import {User, ServerResponseLogin} from '../interfaces/appInterfaces';


const loginInputText = [
    {name: "username", label: "Username", type: "text", minLength: 3},
    {name: "password", label: "Password", type: "password", minLength: 8},
]

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

const Login = () => {
    const queryClient = useQueryClient()
    const { control, handleSubmit } = useForm<User>();
    
    const postLogin = async(user: User)=>{
        const url  = `${process.env.REACT_APP_BASE_URL}/login`;

        return await axios.post<ServerResponseLogin>(url, user, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }
    const loginMutation = useMutation(postLogin, {
        onSuccess: (response)=>{
            queryClient.invalidateQueries();
            if(response.data.status ==='FAILED'){
                Toast.fire({
                    icon: 'error',
                    text:  "The username or password are incorrect"
                });
            }else{
                Toast.fire({
                    text: 'You are sign up!',
                    icon: 'success'
                }).then(()=>{
                    localStorage.setItem('token', response.data.token!);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    window.location.reload();
                });
            }
        }, 
        onError: ()=>{
            Toast.fire({
                title: 'Something bad happened',
                text: "The username or password are incorrect",
                icon: 'error'
            });
        }
    })

    const loginSubmit = (data: User)=>{
        loginMutation.mutate({username: data.username, password: data.password})
    }

    return (
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <Card sx={{display:'flex', justifyContent:'center', flexDirection:'column', mt: 30, minWidth:700}}>
                <CardContent>
                    <Typography variant='h4' sx={{mb:4, mt:2}}>Log In</Typography>
                    {
                        loginInputText.map((input)=>(
                            <FormInputText key={input.name} name={input.name} label={input.label} control={control} type={input.type} minLength={input.minLength}/>
                        ))
                    }
                </CardContent>
                <CardActions sx={{display:'flex', justifyContent:'center', mb: 2}}>
                    <Button variant='contained' size='large' onClick={handleSubmit(loginSubmit)} sx={{mb:2 ,backgroundColor:'#b55b59', "&:hover": { backgroundColor:'#282c34', color:'white'}}}>Login</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default Login