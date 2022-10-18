import React from 'react'
import Box from '@mui/material/Box';
import { useQuery} from 'react-query'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import Category from './Category';
import NewCategoryModal from './NewCategoryModal';
import {ICategories, ObjectCategory} from '../interfaces/appInterfaces';


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

function Categories() {

    const { isLoading, isError, data }  = useQuery<ICategories, Error>('categories', async()=>{
        const response =  await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    })

    if(isError){
        Toast.fire({
            title: 'Something bad happened',
            icon: 'error'
        })
    }
    
  return (
        <Box>
            <Box sx={{display:'flex', justifyContent:'flex-end', mt:15, mr:8}}>
                <NewCategoryModal/>
            </Box>
            
            {isLoading ? (
                <Box sx={{display:'flex', justifyContent:'center', mt:15}}>
                    <CircularProgress/>
                </Box>
            ) : null}
            {
                data?.categories !== undefined? data.categories.map((item: ObjectCategory) =>(
                    <Category key={item.name} category={item}/> 
                )): (<CircularProgress/>)
            }
               
        </Box>
  )
}

export default Categories