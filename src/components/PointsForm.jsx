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
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import {addPoints, check} from '../utils.js'
import { useEffect } from 'react';

export const PointsForm=({open,setOpen,id,title})=> {
const {user}=useContext(UserContext)
const [points,setPoints]=useState(null)
const [flag,setFlag]=useState(false)

useEffect(() => {
  async function fetchData() {
    try {
      const result = await check(user.uid, id);
      setFlag(result);
    } catch (error) {
      console.error("Hiba történt az adatok lekérése során:", error);
    }
  }

  fetchData();
}, [user, id]);


console.log(flag);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit=(e)=>{
    e.preventDefault
    //console.log(points,user.uid);
    addPoints(id,points,user.uid)
    setOpen(false)
  }
console.log('pont:',points);
console.log(title+"jpg");
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
            <img className="img-thumbnail" src={title+".jpg"} alt="minta" />
          </DialogContentText>
         {flag ? <p>Ezt már értékelted!</p> :  <PointsSlider setPoints={setPoints}/>}
        </DialogContent>
       <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
         {!flag &&  <Button onClick={handleSubmit}>Submit</Button>}
        </DialogActions>
        
      </Dialog>
    </div>
  );
}