import React from "react";

import { signOut } from "firebase/auth";
import { auth } from "../firebaseApp";
import { FaSignOutAlt } from "react-icons/fa";
import Cookies from "universal-cookie";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa6";

const cookies = new Cookies(); //to set and get cookies from the browser

export const Navbar = () => {

    const handleSignOut = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
        setIsAuth(false);
      };
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
    <FaSignOutAlt onClick={handleSignOut}/>
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
