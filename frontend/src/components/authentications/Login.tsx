import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent'
import { FormInputText } from '../utils/FormInputText';
import { useForm } from 'react-hook-form';

const loginInputText = [
    {name: "username", label: "Username", type: "text", minLength: 3},
    {name: "password", label: "Password", type: "password", minLength: 8},
]

const Login = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    return (
        <Card>
            <CardContent>
                
            </CardContent>
        </Card>
    )
}

export default Login