import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { FormInputText } from '../utils/FormInputText';
import { useForm } from 'react-hook-form';
import {FormInputSelect} from '../utils/FormInputSelect';
import Typography from '@mui/material/Typography';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';

const operationInputText = [
    {name: "concept", label: "Concept", type: "text", minLength: 1},
    {name: "amount", label: "Amount", type: "number", minLength: 1},
    {name:'date', label:'Date of creation of the operation',  type:'date', minLength:0}
]

const optionsSelect =[
    {label:'Income', value:'Income'},
    {label:'Expense', value: 'Expense'}
]

interface CategoriesSelect {
    value: string,
    label: string
}

interface ObjectCategory{
    id: string, 
    name: string
}

interface Operation{
    concept: string,
    amount: number,
    type: string,
    date: Date,
    categoryId: string
}

interface DataResponse{
    status?: string,
    message?: string,
    operation?: {
        concept: string,
        amount: number,
        type: string,
        date: Date,
        category: {
            id: string,
            name: string,
        }
    }
}

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


function OperationForm() {

    const { control, handleSubmit, setValue } = useForm<Operation>();
    const { operationId } = useParams()
    const queryClient = useQueryClient();

    const getCategories = async()=>{
        const response =  await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        });
        
        const optionsSelectCategory = response.data?.categories.map((item: ObjectCategory)=>{
            return {label: item.name, value: item.id}
        }) 
        return optionsSelectCategory
    }

    const getOperation = async()=>{
        if(operationId !== undefined){
            const url = `${process.env.REACT_APP_BASE_URL}/operation/${operationId}`;
            const response = await axios.get<DataResponse>(url, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            })
            return response.data
        }
    }

    const postOperation = async(operation : Operation)=>{
        const url = operationId !== undefined ? `${process.env.REACT_APP_BASE_URL}/operation/${operationId}` : `${process.env.REACT_APP_BASE_URL}/operation`
        return await axios.post<DataResponse>(url, operation, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })
    }


    const {isError: isErrorCategories, isLoading: isLoadingCategories, data: dataCategories} = useQuery<CategoriesSelect[]>('categories', getCategories)
    const {isError: isErrorOperation, isLoading: isLoadingOperation, data: dataOperation} = useQuery('operation', getOperation);
    

    React.useEffect(()=>{
        if(dataOperation !== undefined){
            const operationObject = dataOperation?.operation!

            setValue('concept', operationObject.concept);
            setValue('amount', operationObject.amount);
            setValue('type', operationObject.type);
            setValue('categoryId', operationObject.category.id);
        }
    }, [dataOperation, setValue])


    const operationMutation = useMutation(postOperation, {
        onSuccess: (response)=>{
            queryClient.invalidateQueries();
            Swal.fire({
                title: response.data.message,
                icon: 'success'
            })
        },
        onError: ()=>{
            Swal.fire({
                title: 'Something bad happened',
                icon: 'error'
            })
        }   
    })

    const submitOperation = (data: Operation)=>{
        operationMutation.mutate({concept: data.concept,amount: data.amount, type: data.type, date: new Date(data.date), categoryId: data.categoryId})        
    }

    if(isErrorCategories || isErrorOperation){
        Toast.fire({
            title: 'Something bad happened',
            icon: 'error'
          })
    }



    return (
        <Box sx={{display:'flex', justifyContent:'center', width: '100%'}}>
            <Card sx={{ minWidth: 800, mt: 30}}>
                {isLoadingCategories || isLoadingOperation ? (
                    <Box sx={{display:'flex', justifyContent:'center', mt:15}}>
                        <CircularProgress/>
                    </Box>
                ) : null}
                <CardContent sx={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                    <Typography variant='h3' sx={{mt:2, mb:5}}>Operation form</Typography>
                   {operationInputText.map((input)=>(
                       <FormInputText key={input.name} name={input.name} label={input.label} control={control} type={input.type} minLength={input.minLength}/>
                   ))}

                   {dataCategories !== undefined?(<FormInputSelect name="categoryId" control={control} label="Category of operation" disabled={false} options={dataCategories}/>) : (null)}
                   <FormInputSelect name="type" control={control} label="Type of operation" options={optionsSelect} disabled={operationId !== undefined? true : false}/>
                </CardContent>
                    
                <CardActions sx={{display:'flex', justifyContent:'center', mt:2}}>
                    <Button variant='contained' onClick={handleSubmit(submitOperation)}>{operationId !== undefined? 'Update operation' :'Create operation'}</Button>
                </CardActions>
            </Card>
        </Box>        
    )
}

export default OperationForm