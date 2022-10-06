import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
    { field: 'concept', headerName: 'Concept', width: 300 },
    { field: 'amount', headerName: 'Amount', width: 170 },
    { field: 'type', headerName: 'Type (income or expenses)', width: 200 },
    { field: 'date', headerName: 'Date', width: 170 },
    { field: 'category', headerName: 'Category', width: 170 },    
];
  

interface OperationTableProps{
  operations: {
    id: string,
    concept: string,
    amount: number,
    type: string,
    date: Date,
    category: string
  }[]
}

function OperationTable({operations}: OperationTableProps) {
  const rows = operations ? operations: [] 
  return (
    <Box sx={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
    />
  </Box>
  )
}

export default OperationTable