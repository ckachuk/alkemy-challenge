import React from 'react'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent'
import { FormInputText } from '../utils/FormInputText';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import {NewUser, ServerResponseSignUp} from "../interfaces/appInterfaces";
import Swal from 'sweetalert2';
import axios from 'axios';

const signupInputText = [
    {name: "username", label: "Username", type: "text", minLength: 3},
    {name: "email", label: "Email", type: "text", minLength: 3},
    {name: "password", label: "Password", type: "password", minLength: 8},
    {name: "confirmPassword", label: "Confirm password", type: "password", minLength: 8}
]


const Signup = () => {

    const queryClient = useQueryClient()

    const { control, handleSubmit } = useForm<NewUser>();

    const postNewUser = async(newUser: NewUser)=>{
        const url = `${process.env.REACT_APP_BASE_URL}/signup`
        return await axios.post<ServerResponseSignUp>(url, newUser, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }

    const newUserMutation = useMutation(postNewUser, {
        onSuccess: (response)=>{
            queryClient.invalidateQueries();
            if(response.data.status ==='FAILED'){
                Swal.fire({
                    title: 'Something bad happened',
                    icon: 'error',
                    text: response.data.message
                });
            }else{
                Swal.fire({
                    title: 'You are sign up!',
                    icon: 'success'
                });
            }
            
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
        }else{
            Swal.fire({
                title: 'Something bad happened',
                text: 'The passwords do not match',
                icon: 'error'
            });
        }
    }

    return(
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <Card sx={{display:'flex', justifyContent:'center', flexDirection:'column', mt: 15, minWidth:1000}}>
                <CardContent>
                    <Typography variant='h4' sx={{mb:4, mt:2}}>Please sign up</Typography>
                    {
                        signupInputText.map((input)=>(
                            <FormInputText key={input.name} name={input.name} label={input.label} control={control} type={input.type} minLength={input.minLength}/>
                        ))
                    }
                </CardContent>
                <CardActions sx={{display:'flex', justifyContent:'center', mb: 2}}>
                    <Button variant='contained' size='large' onClick={handleSubmit(submit)} sx={{mb:2 ,backgroundColor:'#b55b59', "&:hover": { backgroundColor:'#282c34', color:'white'}}}>Sign up</Button>
                </CardActions>
          </Card>
        </Box>
       
    )
}

export default Signup