import React from 'react';
import { BrowserRouter as Router, Routes , Route, Link, BrowserRouter, useLocation } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import LandingPage from './LandingPage/LandingPage'
import LoginPage from './LoginPage/LoginPage'
import SignupPage from './SignupPage/SignupPage'
import DashboardPage from './DashboardPage/DashboardPage'
import { initializeApp } from 'firebase/app';
//import LinkPage from './LinkPage/LinkPage'
//import Create from './Create/Create'




const firebaseConfig = {

  apiKey: "AIzaSyC0WzN8b1WZ1BKvYObM_bEOEA7h0NiHmEU",

  authDomain: "cloudapp-b1e10.firebaseapp.com",

  databaseURL: "https://cloudapp-b1e10-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "cloudapp-b1e10",

  storageBucket: "cloudapp-b1e10.appspot.com",

  messagingSenderId: "306526058417",

  appId: "1:306526058417:web:ca2a5ec2035ec1b6806f90",

  measurementId: "G-G600B1ZV35"

  };



  
const app = initializeApp(firebaseConfig);


//comment inside tsx file



function App() {
 
  return (
    
    <div className="wrapper">
      <Routes>
 
        <Route path="" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/dashboard/*" element={<DashboardPage/>}/>



      </Routes>
    </div>

  //<Route path="" element={<p>Create your LinkStock now</p>}/>
  //<Route path="*" element={<p>Welcome to {useLocation().pathname.replace("/", "")}'s LinkStock</p>}/>
    
    
  );
}

export default App;
