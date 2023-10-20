import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PointsSlider } from './PointsSlider';
import { useState } from 'react';

export const PointsForm=({open,setOpen})=> {

const [points,setPoints]=useState(null)

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit=(e)=>{
    e.preventDefault
    console.log(points);
    setOpen(false)
  }
console.log('pont:',points);
  return (
    <div>
     {/*} <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
  </Button>*/}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rate it</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>The perfect solution should looks like this:</p>
            <img className="img-thumbnail" src="Kajak-kenu.jpg" alt="minta" />
          </DialogContentText>
          <PointsSlider setPoints={setPoints}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
