import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa6";
import { useContext } from "react";
import { UserContext } from "../UserContext";



export const Navbar = () => {
  const {logoutUser,user}=useContext(UserContext)
   
    const [toggled, setToggled] = React.useState(false);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
    <Sidebar onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="all">
  <Menu
    menuItemStyles={{
      button: {
        // the active class will be added automatically by react router
        // so we can use it to style the active menu item
        [`&.active`]: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
        },
      },
    }}
  >
    <MenuItem component={<Link to="/" />}>Projects</MenuItem>
    <MenuItem component={<Link to="/add" />}>Add projects</MenuItem>
    <MenuItem component={<Link to="/results" />}> Results</MenuItem>
    <MenuItem>
      <span style={{fontSize:'0.6rem'}}>{user?.displayName}</span>
      <FaSignOutAlt onClick={()=>logoutUser()} title="logout"/>
      
    </MenuItem>
   
  </Menu>
</Sidebar>;
<main style={{ display: 'flex', padding: 10,width:'100%',justifyContent:'flex-end' }}>
        <div >
          <button className="btn btn-outline-primary" onClick={() => setToggled(!toggled)}>
            <FaBars/>
          </button>
        </div>
      </main>
   
    </div>
  );
};
