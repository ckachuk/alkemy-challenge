import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { FormInputText } from '../utils/FormInputText';
import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Category, ServerResponseCreateCategory } from '../interfaces/appInterfaces';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

function NewCategoryModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const queryClient = useQueryClient();

  const postCategory = async(category : Category)=>{
    const url = `${process.env.REACT_APP_BASE_URL}/category`
    return await axios.post<ServerResponseCreateCategory>(url, category, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    }) 
  }

  const categoryMutation = useMutation(postCategory, {
    onSuccess: ()=>{
      queryClient.invalidateQueries();
      handleClose()
      Swal.fire({
        title: 'The category has been created',
        icon:'success'
      })
    },
    onError: ()=>{
      Swal.fire({
        title: 'Something bad happened',
        icon:'error'
      })
    }
  })

  const { control, handleSubmit } = useForm<Category>();


  const submitCategory = (data: Category)=>{
    categoryMutation.mutate({name: data.name})
  }

  return (
    <Box>
      <Button onClick={handleOpen} variant='contained' sx={{backgroundColor: '#b55b59', "&:hover": { backgroundColor:'white', color:'#b55b59'}}} >Create category</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <CardContent>
            <Typography variant='h6' sx={{mb:2}}>Create a new category</Typography>
            <FormInputText name='name' label='Insert category name' type='text' minLength={3} control={control}/>
          </CardContent>
          <CardActions sx={{display:'flex', justifyContent:'center'}}>
            <Button variant='contained' sx={{backgroundColor:"#b55b59","&:hover": { backgroundColor:'white', color:'#b55b59'}}} onClick={handleSubmit(submitCategory)}>Create</Button>
          </CardActions>
        </Card>
      </Modal>
    </Box>
  );
}

export default NewCategoryModal