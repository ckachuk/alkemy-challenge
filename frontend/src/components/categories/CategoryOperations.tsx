import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import OperationTable from '../utils/OperationTable';

function operationFactory(
  id:string,
  concept:string,
  amount: number,
  type: string,
  date: Date |null,
  category: string
){
  return { id, concept, amount, type, date, category }  
}

interface ItemOperation{
  id: string, 
  concept: string, 
  amount: number,
  date: Date | null,
  createAt: string,
  updateAt: string,
  type: string,
  userId: string,
  categoryId: string
}

interface Operations{
  id:string,
  concept:string,
  amount: number,
  type: string,
  date: Date,
  category: string
}

function CategoryOperations() {
  const { categoryId } = useParams();

  const [operations, setOperations] = useState<Operations[]>([])

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
  console.log(isLoading)

  useEffect(()=>{
    const populateOperations = ()=>{
      const arrayOperations = data !== undefined? data.operations.map((item: ItemOperation, index:number)=>{
        return  operationFactory(index.toString(), item.concept, item.amount, item.type, item.date, data.category.name)
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
    <Box sx={{m:40}}>
      {isLoading ? (
                <Box sx={{display:'flex', justifyContent:'center', mt:15}}>
                    <CircularProgress/>
                </Box>
            ) : <OperationTable operations={operations}/>}
      
    </Box>
  )
}

export default CategoryOperations