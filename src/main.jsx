import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from "./UserContext";
import { ClassProvider } from './ClassContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <ClassProvider>
          <App />
    </ClassProvider>
  </UserProvider>
)
