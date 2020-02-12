import React from 'react';
import { Link } from 'react-router-dom'

function Header() {

  // render() {
    return(
      <header>
        <h1>Sim Calendar</h1>
        <p><Link to="/add-race">Add race</Link></p>
      </header>
    );
  // }

}

export default Header;
