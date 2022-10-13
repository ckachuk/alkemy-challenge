import React from 'react'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import OperationInfoModal from './OperationInfoModal';
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

interface OperationActionsProps{
  operationInfo:{
    concept: string,
    amount: number,
    type: string,
    date: Date,
    category: string,
    operationId: string
  }
}

interface DataResponse{
  status?: string,
  message?: string,
}


function OperationActions({operationInfo}: OperationActionsProps) {
  const queryClient = useQueryClient()

  const deleteOperation = async()=>{
    const url = `${process.env.REACT_APP_BASE_URL}/operation/${operationInfo.operationId}`
    return await axios.delete<DataResponse>(url, {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  const deleteOperationMutation = useMutation(deleteOperation,{
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

  const handleDeleteOperation = ()=>{
    Swal.fire({
      title: 'Are you sure you want to eliminate the operation?',
      showCancelButton: true,
      confirmButtonText: 'YES',
      icon:'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOperationMutation.mutate()
      } 
    })
  }

  const url_edit = `/operations/${operationInfo.operationId}`
  return (
    <Box>
      <OperationInfoModal operationInfo={operationInfo}/>
      <Link to={url_edit}><Fab size="small" sx={{m:1}}><EditIcon/></Fab></Link>
      <Fab size="small" sx={{m:1}} onClick={handleDeleteOperation}><DeleteForeverIcon/></Fab>
    </Box>
  )
}

export default OperationActions