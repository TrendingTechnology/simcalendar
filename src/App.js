
import React from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import * as firebase from 'firebase/app'
// import "firebase/auth";
import {firebaseConfig} from './constants/firebase'
import Header from './Components/Header'
import Home from './pages/Home'

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/" component={Home}/>
      </Router>
    </div>
  );
}

export default App;
