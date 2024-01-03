import React, { createContext, useEffect, useState } from 'react';
import {readClasses } from './utils';


export const ClassContext = createContext();

export const ClassProvider = ({ children}) => {
const [classes,setClasses]=useState(null)


  useEffect(() => {
    const unsubscribe =  readClasses(setClasses)
    return () => unsubscribe(); // Cleanup function to unsubscribe when the component unmounts
  }, []);

    return (
    <ClassContext.Provider value={{ classes}}>
                                     
      {children}
    </ClassContext.Provider>
  );
};
