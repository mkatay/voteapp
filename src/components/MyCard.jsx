import React from "react";
import {Card,CardText,CardBody,Button,CardFooter,CardHeader,CardTitle} from 'reactstrap'
import { gitHubUserName } from "../utils";
import { PointsForm } from "./PointsForm";


export const MyCard = ({title,classmate,linkUrl,id}) => {
    const [open, setOpen] = React.useState(false);
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
        <CardText>
            <Button variant="outlined" onClick={handleClickOpen}>
                Rate it...
            </Button>
        </CardText>
        <Button ><a href={linkUrl} target="__blank">View page</a> </Button>
      </CardBody>
      <CardFooter ><div className="d-flex justify-content-between"><span>Votes:</span><span>Points:</span> </div></CardFooter>
    </Card>
    {open && <PointsForm open={open} setOpen={setOpen} id={id}/>}
    </div>
  );
};

