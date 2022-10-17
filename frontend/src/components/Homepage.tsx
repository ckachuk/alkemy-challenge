import React from 'react'
import Box from '@mui/material/Box';
import { useQuery } from 'react-query';
import axios from 'axios';
import OperationTable from './utils/OperationTable';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function operationFactory(
  id:string,
  concept:string,
  amount: number,
  type: string,
  date: Date,
  category: string,
  operationId: string
){
  return { id, concept, amount, type, date, category, operationId }  
}

interface Operation{
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

interface DataResponse{
  status? : string,
  message? : string,
  operations? : Operation[],
  balance? : number
}


const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 10000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

function Homepage() {
  
  const getBalance = async()=>{
    const url = `${process.env.REACT_APP_BASE_URL}/operations/balance`;
    const response = await axios.get<DataResponse>(url,{
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    });
    
    return response.data;
  }

  const {isError, isLoading, data} = useQuery('balance', getBalance);

  const filteredData = (data: DataResponse)=>{
    const dataTable = data !== undefined? data.operations?.map((item: Operation, index: number)=>{
      return operationFactory(index.toString(), item.concept, item.amount, item.type, item.date, item.category.name, item.id)
    }) : null
    return dataTable
  }

  if(isError){
    Toast.fire({
      title: 'Something bad happened',
      icon: 'error'
    })
  }
  return (
    <Box sx={{display:'flex', justifyContent:'center', mt: 17, flexDirection: 'column'}}>
        <Box sx={{display:'flex', justifyContent:'flex-end', mr:8, mb:4}}>
          <Link to='operation'><Button  sx={{backgroundColor: '#b55b59',color: 'white', "&:hover": { backgroundColor:'white', color:'#b55b59'}}}>New operation</Button></Link>
        </Box>
        <Box sx={{display:'flex', justifyContent:'center'}}>
          {isLoading? <CircularProgress/> : null}
          {data !== undefined ?  <OperationTable operations={filteredData(data)}/>: null}
        </Box>
        <Box sx={{display:'flex', justifyContent:'center'}}>
          <Card sx={{display:'flex', justifyContent:'center', width:700, mt: 4}}>
            <CardContent>
              <Typography variant='h5'>The balance is ${data?.balance}</Typography>
            </CardContent>
          </Card>
        </Box>
    </Box>
    
  )
}

export default Homepage