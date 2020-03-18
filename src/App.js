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
import AddRace from './pages/admin/AddRace'
import EditRace from './pages/admin/EditRace'
import AdminIndex from './pages/admin/AdminIndex'
import SignInScreen from './pages/admin/SignInScreen'
import {AuthProvider} from './pages/admin/Auth'
import PrivateRoute from './pages/admin/PrivateRoute'
import Footer from './Components/Footer'
import ContactForm from './pages/ContactForm'

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
            <Route exact path="/" component={Home}/>
            <Route exact path="/signin" component={SignInScreen}/>
            <Route exact path="/contact" component={ContactForm}/>
            <PrivateRoute exact path="/race-control/" component={AdminIndex}/>
            <PrivateRoute exact path="/race-control/add-race" component={AddRace}/>
            <PrivateRoute exact path="/race-control/edit-race" component={EditRace}/>
          <Footer/>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
