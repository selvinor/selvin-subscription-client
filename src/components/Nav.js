import React from 'react';
import { Redirect } from 'react-router-dom';
//import '../styles/nav.css';

export default function Nav() {


  return (
    <React.Fragment>
      <nav id="Navbar_links">
        <Redirect className="Navbar__Link" to='/'>Home</Redirect>
        <Redirect className="Navbar__Link" to='/products '>Products</Redirect>
      </nav>
    </React.Fragment>  
  );
}