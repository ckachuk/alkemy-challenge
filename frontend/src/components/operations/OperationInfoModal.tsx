import React from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InfoIcon from '@mui/icons-material/Info';
import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

interface OperationInfoModalProps{
  operationInfo:{
      concept: string,
      amount: number,
      type: string,
      date: Date,
      category: string,
  }
}


function OperationInfoModal({operationInfo}: OperationInfoModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <>
      <Fab onClick={handleOpen} size="small" sx={{m:1}}><InfoIcon/></Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <CardContent>
            <Typography  sx={{ mt: 2 }}>
              Concept: {operationInfo.concept}
            </Typography>
            <Typography  sx={{ mt: 2 }}>
              Amount: {operationInfo.amount}
            </Typography>
            <Typography  sx={{ mt: 2 }}>
              Date created: {operationInfo.date !==null ? operationInfo.date.toString(): ''}
            </Typography>
            <Typography  sx={{ mt: 2 }}>
              Type: {operationInfo.type}
            </Typography>
            <Typography  sx={{ mt: 2 }}>
              Category: {operationInfo.category}
            </Typography>
          </CardContent>
          
        </Card>
      </Modal>
    </>
  );
}

export default OperationInfoModal