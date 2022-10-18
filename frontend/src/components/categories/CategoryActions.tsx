import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';
import Swal from 'sweetalert2';
import {CategoryActionsProps, ServerResponseDeleteCategory} from '../interfaces/appInterfaces';



function CategoryActions({categoryId}: CategoryActionsProps) {

  const queryClient = useQueryClient();

  const deleteCategory = async()=>{
    const url = `${process.env.REACT_APP_BASE_URL}/category/${categoryId}`;
      return await axios.delete(url, {
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }
      })
  }

  const deleteCategoryMutation = useMutation<ServerResponseDeleteCategory>(deleteCategory,{
    onSuccess: (response)=>{
      queryClient.invalidateQueries()
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

  const handleDelete = ()=>{
    Swal.fire({
      title: 'Are you sure you want to eliminate the category?',
      showCancelButton: true,
      confirmButtonText: 'YES',
      icon:'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategoryMutation.mutate()
      } 
    })
  }

  return (
    <Box className='divPostActions' sx={{display: 'flex', justifyContent: 'center', ml:5}}>
      <Card>
        <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
          <Fab size="small" onClick={handleDelete}><DeleteForeverIcon/></Fab>
        </CardActions>  
      </Card>
    </Box>
  )
}

export default CategoryActions