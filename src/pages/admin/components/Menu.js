import React from 'react'
import {Link} from 'react-router-dom'
import * as firebase from 'firebase/app'
import "firebase/auth";

const Menu = () => {
  return (
    <ul className="admin-menu">
      <li><Link to="/race-control/">View races</Link></li>
      <li><Link to="/race-control/add-race">Add new race</Link></li>
      <li><button onClick={() => firebase.auth().signOut()}>Sign out</button></li>
    </ul>
  )
}

export default Menu
