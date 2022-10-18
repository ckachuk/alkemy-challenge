import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import OperationTable from '../utils/OperationTable';
import { Typography } from '@mui/material';
import { Operation, OperationsTable } from '../interfaces/appInterfaces';

function operationFactory(
  id:string,
  concept:string,
  amount: number,
  type: string,
  date: Date |null,
  category: string,
  operationId: string
){
  return { id, concept, amount, type, date, category, operationId }  
}

function CategoryOperations() {
  const { categoryId } = useParams();

  const [operations, setOperations] = useState<OperationsTable[]>([])

  const { isError, isLoading, data } = useQuery('categoryOperation', async()=>{
    const url = `${process.env.REACT_APP_BASE_URL}/category/${categoryId}`
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })
    return response.data
  })
  
  useEffect(()=>{
    const populateOperations = ()=>{
      const arrayOperations = data !== undefined? data.operations.map((item: Operation, index:number)=>{
        return  operationFactory(index.toString(), item.concept, item.amount, item.type, item.date, data.category.name, item.id)
      }): null

      setOperations(arrayOperations)
    }

    populateOperations();
  }, [data])

  if(isError){
    Swal.fire({
        title: 'Something bad happened',
        icon: 'error'
    })
}

  return (
    <Box>
      <Box sx={{display:'flex', justifyContent:'center', mt:20}}>
        <Typography variant='h4' sx={{color:'white'}}>Operations of the category: {data.category.name}</Typography>
      </Box>
      {isLoading ? (
                <Box sx={{display:'flex', justifyContent:'center', mt:10}}>
                    <CircularProgress/>
                </Box>) : null}
      {data !==undefined ? 
      (<Box sx={{display:'flex', justifyContent:'center', mt:10}}>
                        <OperationTable operations={operations}/>
      </Box>): (null)}
    </Box>
  )
}

export default CategoryOperations