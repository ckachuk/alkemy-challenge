import React from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import { useQuery } from 'react-query';
import axios from 'axios';
import OperationTable from '../utils/OperationTable';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { Operation, ServerResponseGetOperations } from '../interfaces/appInterfaces';

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





function Operations() {
  const [alignment, setAlignment] = React.useState('all');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };
  
  const getAllOperations = async()=>{
    const url = `${process.env.REACT_APP_BASE_URL}/operations`;
    const response = await axios.get<ServerResponseGetOperations>(url,{
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    });
    
    return response.data;
  }

  const getIncomeOperations = async()=>{
    const url = `${process.env.REACT_APP_BASE_URL}/operations/incomes`;
    const response = await axios.get<ServerResponseGetOperations>(url,{
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    });

    return response.data;
  }

  const getExpenseOperations = async()=>{
    const url = `${process.env.REACT_APP_BASE_URL}/operations/expenses`
    const response = await axios.get<ServerResponseGetOperations>(url,{
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })

    return response.data;
  }

  const filteredData = (data: ServerResponseGetOperations)=>{
    const dataTable = data !== undefined? data.operations?.map((item: Operation, index: number)=>{
      return operationFactory(index.toString(), item.concept, item.amount, item.type, item.date, item.category.name, item.id)
    }) : null
    return dataTable
  }


  const {isError: isErrorAllOperations, isLoading: isLoadingAllOperations, data: allOperations} = useQuery('allOperations', getAllOperations)
  const {isError: isErrorIncomeOperations, isLoading: isLoadingIncomeOperations, data: incomeOperations} = useQuery('incomeOperations', getIncomeOperations)
  const {isError: isErrorExpenseOperations, isLoading: isLoadingExpenseOperations, data: expenseOperations} = useQuery('expenseOperations', getExpenseOperations)

  const tableData =  ()=>{
    return alignment==='all' && allOperations !==undefined?
    (
      <Box sx={{display:'flex', justifyContent:'center'}}>
        {isLoadingAllOperations? <CircularProgress/> : <OperationTable operations={filteredData(allOperations)}/>}
      </Box>  
    ): alignment === 'income'  && incomeOperations !== undefined?
    (
      <Box sx={{display:'flex', justifyContent:'center'}}>
        {isLoadingIncomeOperations? <CircularProgress/> : <OperationTable operations={filteredData(incomeOperations)}/>}
      </Box>  
    ): alignment === 'expense' && expenseOperations !== undefined ?
    (
      <Box sx={{display:'flex', justifyContent:'center'}}>
        {isLoadingExpenseOperations? <CircularProgress/> : <OperationTable operations={filteredData(expenseOperations)}/>}
      </Box>  
    ): null
  }

  if(isErrorAllOperations || isErrorIncomeOperations || isErrorExpenseOperations){
    Swal.fire({
        title: 'Something bad happened',
        icon: 'error'
    })
  }

  
  
  return (
    <Box sx={{display:'flex', justifyContent:'center',mt:17, flexDirection:'column'}}>
      <Box sx={{display:'flex', justifyContent:'flex-end', mr:8, mb:4}}>
          <Link to='operation'><Button  sx={{backgroundColor: '#b55b59',color: 'white', "&:hover": { backgroundColor:'white', color:'#b55b59'}}}>New operation</Button></Link>
        </Box>
      <Box sx={{display:'flex', justifyContent:'center', mb:3}}>
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{backgroundColor: 'white'}}
          >
            <ToggleButton value="income">Income</ToggleButton>
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="expense">Expense</ToggleButton>
          </ToggleButtonGroup>
      </Box>
       
      {tableData()}
       
    </Box>
  )
}

export default Operations