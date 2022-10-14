import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import OperationActions from '../operations/OperationActions';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
    { field: 'concept', headerName: 'Concept', width: 300 },
    { field: 'amount', headerName: 'Amount', width: 170 },
    { field: 'type', headerName: 'Type (income or expenses)', width: 200 },
    { field: 'date', headerName: 'Date', width: 170 },
    { field: 'category', headerName: 'Category', width: 170 },  
    { 
      field: 'action', 
      headerName: 'Acciones', 
      width:200, 
      disableColumnMenu: true,
      sortable: false,
      renderCell: ({row})=>{
        return (
          <>
            <OperationActions operationInfo={row}/>
          </>
        )
      }
    }  
];


interface OperationTableProps{
  operations: {
    id: string,
    concept: string,
    amount: number,
    type: string,
    date: Date,
    category: string,
    operationId: string
  }[] | undefined | null
}

function OperationTable({operations}: OperationTableProps) {
  const rows = operations ? operations: [] 
  return (
    <Box sx={{ height: 500,minWidth: 1325, maxWidth: 1325}}>
    <DataGrid
      sx={{backgroundColor: 'white'}}
      rows={rows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
    />
  </Box>
  )
}

export default OperationTable