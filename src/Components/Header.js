import React from 'react';
import { Link } from 'react-router-dom'

function Header() {
    return(
      <header>
        <h1>Sim Calendar</h1>
        <p><Link to="/">View races</Link></p>
        <p><Link to="/admin/add-race">Add race</Link></p>
      </header>
    )
}

export default Header;
