import React, { createContext, useEffect, useState } from 'react';
import {readClasses } from './utils';


export const ClassContext = createContext();

export const ClassProvider = ({ children}) => {
const [classes,setClasses]=useState(null)
const [projects,setProjects]=useState(null)


  useEffect(() => {
    const unsubscribe =  readClasses(setClasses,setProjects)
    return () => unsubscribe(); // Cleanup function to unsubscribe when the component unmounts
  }, []);

    return (
    <ClassContext.Provider value={{ classes,projects}}>
                                     
      {children}
    </ClassContext.Provider>
  );
};
