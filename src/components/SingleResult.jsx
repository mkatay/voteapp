import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import WorkIcon from '@mui/icons-material/Work';
import List from "@mui/material/List";
import { useState } from 'react';
import { gitHubUserName } from '../utils';


export const  SingleResult = ({linkUrl,rate}) => {
    const [open, setOpen] = useState(false);

    const voteCount=(rate.filter(obj=>obj.points && obj.points>0)).length//csak a >0 pontozás számít
    const votePoints=rate.reduce((acc,r)=>r.points? acc+r.points : acc,0)
    let grade=voteCount>0 && votePoints>0 ? (votePoints*5/(voteCount*10)).toFixed(2) : null
    grade=grade ? (grade>5 ? 5 : grade): ''

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
         <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <WorkIcon/>
                </ListItemIcon>
                <ListItemText primary=  {gitHubUserName(linkUrl)}  />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={`Votes:${voteCount} Points:${votePoints} - Grade:${grade  } `}/>
                  </ListItemButton>
                </List>
              </Collapse>
    </div>
  )
}
