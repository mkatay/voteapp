import React, { createContext, useEffect, useState } from 'react';
import { readPoints } from './utils';

export const PointsContext = createContext();

export const PointsProvider = ({ children ,id}) => {
const [points,setPoints]=useState(0)
const [votes,setVotes]=useState(0)

  useEffect(() => {
    const unsubscribe =  readPoints(id,setPoints,setVotes)
    return () => unsubscribe(); // Cleanup function to unsubscribe when the component unmounts
  }, [id]);

    return (
    <PointsContext.Provider value={{ points,votes}}>
                                     
      {children}
    </PointsContext.Provider>
  );
};
