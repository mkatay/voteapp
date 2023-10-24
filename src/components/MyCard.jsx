import React,{useState,useEffect} from "react";
import {Card,CardText,CardBody,Button,CardFooter,CardHeader,CardTitle} from 'reactstrap'
import { gitHubUserName } from "../utils";
import { PointsForm } from "./PointsForm";
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { check} from '../utils.js'
import { PointsContext } from "../PointsContext";


export const MyCard = ({title,classmate,linkUrl,id,changed,setChanged}) => {
    const [open, setOpen] = React.useState(false);
    const {user}=useContext(UserContext)
    const [flag,setFlag]=useState(false)
    const {points,votes}=useContext(PointsContext)

    const fetchData=async()=> {
      try {
        const result = await check(user.uid, id);
        setFlag(result);
      } catch (error) {
        console.error("Hiba történt az adatok lekérése során:", error);
      }
    }
    useEffect(() => {
      setChanged(changed+1)
      fetchData();
    }, [user, id,flag]);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  return (
    <div className="mycard">
    <Card
      className="my-2" style={{ width: "18rem",  }} >
      <CardHeader>{gitHubUserName(linkUrl)} - {classmate}</CardHeader>
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <Button color="primary"><a href={linkUrl} target="__blank">View page</a> </Button>
        <CardText className="text-center m-2">
            <Button color="dark" variant="outlined" disabled={flag} onClick={handleClickOpen}>
                Rate it...
            </Button>
        </CardText>
      </CardBody>
      <CardFooter ><div className="d-flex justify-content-between">
        <span>Votes:<b>{votes}</b></span>
        <span>Points:<b>{points}</b></span> 
        <span>Average:<b>{votes && Math.floor(points/votes)}</b></span>
      </div></CardFooter>
    </Card>
    {open && <PointsForm open={open} setOpen={setOpen} id={id} title={title}/>}
    </div>
  );
};

