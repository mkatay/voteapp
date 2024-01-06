import React, { createContext, useEffect, useState } from 'react';
import { readPoints } from './utils';

export const PointsContext = createContext();

export const PointsProvider = ({ children ,id}) => {
const [points,setPoints]=useState(0)
const [votes,setVotes]=useState(0)

  useEffect(() => {
     readPoints(id,setPoints,setVotes)
  }, [id]);

    return (
    <PointsContext.Provider value={{ points,votes}}>
                                     
      {children}
    </PointsContext.Provider>
  );
};
