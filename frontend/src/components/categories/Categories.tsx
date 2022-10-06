import React from 'react'
import Box from '@mui/material/Box';
import { useQuery} from 'react-query'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import Category from './Category';
import NewCategoryModal from './NewCategoryModal';

interface ICategories{
    categories: Array<ObjectCategory>,
}


interface ObjectCategory{
    id: string, 
    name: string
}


function Categories() {

    const { isLoading, isError, data }  = useQuery<ICategories, Error>('categories', async()=>{
        const response =  await axios.get('http://localhost:3000/api/categories',{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    })

    if(isError){
        Swal.fire({
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
                data?.categories.map((item: ObjectCategory) =>(
                    <Category key={item.name} category={item}/> 
                ))
            }
               
        </Box>
  )
}

export default Categories