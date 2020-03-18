import React, {useContext} from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from "../pages/admin/Auth";

const Header = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);


  return(
    <header>
      <h1><Link to="/">Drive.<span>Race.</span><span>Win.</span></Link></h1>
      { currentUser ? (
          <>
          <p><Link to="/">View races</Link></p>
          <p><Link to="/race-control/">Admin</Link></p>
          </>
        ) : (null)
      }
    </header>
  )
}

export default Header
