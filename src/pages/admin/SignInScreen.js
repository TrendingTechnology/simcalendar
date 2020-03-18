import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import * as firebase from 'firebase/app'
import "firebase/auth";
import { AuthContext } from "./Auth.js";

const SignInScreen = ({history}) => {

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/race-control");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="wrapper">
      <p>Please sign-in</p>
      <form onSubmit={handleLogin}>
        <ul>
          <li>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </li>
          <li><input type="submit" value="Sign in" /></li>
        </ul>
      </form>
    </div>
  );
}

export default withRouter(SignInScreen)
