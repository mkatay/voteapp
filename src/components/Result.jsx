import React from "react";
import { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";

import {SingleResult} from "./SingleResult";
import { MyForm } from "./MyForm";


export const Result = () => {
  const [results, setResults] = useState([]);
  
  return (
    <div>
      <MyForm setResults={setResults} hContent='Results summary'/>
      <List
        sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" ,margin:"10px auto"}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Works
          </ListSubheader>
        }
      >
        {results.length > 0 &&
          results.map((obj) => <SingleResult key={obj.linkUrl} {...obj}/>)}
      </List>
    </div>
  );
};
