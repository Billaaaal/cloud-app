//create react app
import React, { useEffect, useState } from 'react';

//import css
import styles from './SignupPage.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, getIdToken, deleteUser } from 'firebase/auth';
import { create } from 'domain';
import { sign } from 'crypto';
import handleErrorCode from '../methods/handleErrorCode';
import { unsubscribe } from 'diagnostics_channel';



//import components


function App(){

  const navigate = useNavigate()



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('');
  const [signupErrorMessage, setSignupErrorMessage] = useState('');
  const [isSignupLoading, setIsSignupLoading] = useState(false);



  const firebaseConfig = {
    apiKey: "AIzaSyC0WzN8b1WZ1BKvYObM_bEOEA7h0NiHmEU",
    authDomain: "cloudapp-b1e10.firebaseapp.com",
    projectId: "cloudapp-b1e10",
    storageBucket: "cloudapp-b1e10.appspot.com",
    messagingSenderId: "306526058417",
    appId: "1:306526058417:web:ca2a5ec2035ec1b6806f90",
    measurementId: "G-G600B1ZV35"
  };

  
  //const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
  const auth = getAuth();


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        //alert(uid)
        //then navigate to the dashboard
        // ...


        //navigate('/dashboard/')


        const dateObject = (new Date(user.metadata.creationTime?.toString()!).getTime()) / 1000

        const currentTimestamp = (Date.now()) / 1000;


        console.log(user.metadata.creationTime + " " + (currentTimestamp - dateObject))



        
        if (Math.round(currentTimestamp - dateObject) < 10){

          console.log("Condition met: you've just sign up")


        }else{
          console.log("Condition met : you're about to go to dashboard")
          
          
          navigate('/dashboard/')



        }
      
        



      } else {
        // User is signed out
        // ...
  
        //lert("You are not signed in")
  
      }
    });

    return () => {
      
      unsubscribe()
      
      // Clean up side effects or subscriptions here when the component unmounts
    };
  


  }, []);


  


  function createUserInDB(idToken:String, user:any){
    
  // Replace these values with your actual API endpoint and data

  // Fetch API POST request

  const controller = new AbortController()
  const signal = controller.signal



  fetch(
    'http://localhost:5000/api/create-user',

    
     {
      signal,
    method: 'POST',
    
    headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
    }
     // Convert the data to JSON format
  }
  
  )
  .then(response => {

//    alert("Creating user in DB")

    //response.status
    //if (!response.ok) {
    //}




    if (response.status === 200) {

      navigate('/dashboard/')
      setIsSignupLoading(false)
      


    }
    else{


      setSignupErrorMessage("Server error")
      setIsSignupLoading(false)


      user.delete().then(() => {



      })




    }
    return response.json(); // Parse the response body as JSON
  })
  .then(data => {
    //alert(data);
   // console.log(data.message)
   //console.log(data)
    // Do something with the response data here
  }).catch((error) => {

    //alert("Error")

    setSignupErrorMessage("Server error")
    setIsSignupLoading(false)

    user.delete().then(() => {

    


    })


  })

  setTimeout(() => controller.abort(), 6000)




  }


  



  function handleSignup(e:any) {
    e.preventDefault(); // Stop the form from submitting

    setIsSignupLoading(true)

    setSignupErrorMessage("")

    if (!email?.toString().trim()){
      setSignupErrorMessage("Enter an Email")
      setIsSignupLoading(false)

    }else if(!password?.toString().trim()){

      setSignupErrorMessage("Enter a Password")
      setIsSignupLoading(false)

    }
    else{

      

      createUserWithEmailAndPassword(auth, email, password)
  
      .then((userCredential) => {


        const user = userCredential.user;

        const uid = user.uid;

        user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          // Send token to your backend via HTTPS
          // ...
          //alert(idToken)



          createUserInDB(idToken, user)


        }).catch(function(error) {

          


          // Handle error
        });
        
  

      //createUserInDB()

        //use that uid to make an api call to the backend to create a user in the database and also the files folder

        //maybe also use a token or something like that


      //!!!!!!!!!!!!!!!!!!!!IMPORTANT!!!!!!!!!!!!!!!!!!!!!
      //navigate('/dashboard/')


        //not good
        //userCredentials.user?.getIdToken().then(function(idToken) {
         // alert(userCredentials.user.email)
          //console.log(idToken);
          //setToken(idToken);
          //setIsAuth(true);
          
          //navigate("/dashboard", {state:{userCredentials:userCredentials}})
          
          //make an api call to the backend to create a user in the database and also the files folder
          //alert("Token: " + idToken);

        console.log(userCredential.user)  
        //});
      
        // Sign up successful, do something if needed
        //alert(userCredential);
        //alert("Signed up successfuly")
        
      })
      .catch((error) => {
        // Sign up failed, handle the error

        //console.log(error.code)
        

        setSignupErrorMessage(handleErrorCode(error.code)!.toString())
        setIsSignupLoading(false)

        
      
        //setSignupErrorMessage(error.message)

      });
 





    }
    

    
  }

  

  return (

    <div className={styles.app}>

      <div className={styles.navbar}>

              
        <img src="https://i.ibb.co/xXPXQP0/logo.png" 
        className={styles.logo}></img>


        <div className={styles.navButtons}>
          
          <Link className={styles.navButtonElement} to={'/'}>Home</Link>
          <Link className={styles.navButtonElement} to={''}>About</Link>
          <Link className={styles.navButtonElement} to={''}>Contact Us</Link>
          <Link className={styles.navButtonElement} to={'/signup'}>Sign Up</Link>
          <button className={styles.navButtonLoginElement} onClick={()=>{navigate("/login")}}><a>Login</a></button>

        </div>

      </div> 

      
      <div className={styles.mainContainer}>

        <div className={styles.presentationContainer}>

          <h1 className={styles.presentationTitle}>Sign up</h1>

          <h2 className={styles.presentationSubTitle}>To move to the cloud</h2>

          <div className={styles.subContainer}>

            <div className={styles.subSubContainer}>
              
              <p className={styles.subTitle}>If you already have an acount</p>

              <p className={styles.subTitle}>You can sign in  <Link to={'/login'} className={styles.specialColour}> here !</Link></p>
            
            </div>

            

            <img src='https://i.ibb.co/4FWS973/Saly-14.png' className={styles.illustration}></img>


          </div>

          
          



        </div>

        <div className={styles.separator}></div>



        <div className={styles.signUpContainer}>

          <h1 className={styles.signUpContainerTitle}>Sign Up</h1>


          <input onKeyDown={(e)=>{if(e.key === "Enter"){handleSignup(e)}}} className={styles.textInputField} type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>

          <input onKeyDown={(e)=>{if(e.key === "Enter"){handleSignup(e)}}} className={styles.textInputField}  type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>

          <h1 className={styles.signupErrorMessageTitle}>{signupErrorMessage}</h1>
          
          <button className={styles.signUpButton} onClick={(e)=>{handleSignup(e)}}>{ isSignupLoading   ? <div className={styles.loadingAnimation}></div>   : <span>Sign Up</span> }</button>

        </div>







      </div>


    </div>

    
    
      
    )
    

    
}

export default App;