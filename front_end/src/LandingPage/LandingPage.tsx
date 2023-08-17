//create react app
import React, { useEffect } from 'react';

//import css
import styles from './LandingPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//import components

function App() {
  const auth = getAuth();

  useEffect(() => {
    //alert("Login page has been mounted")

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        //alert(uid)
        //then navigate to the dashboard
        // ...
        navigate('/dashboard/');

        //maybe add the same logic as in the signup page with the timestamp check
      } else {
        // User is signed out
        // ...
        //lert("You are not signed in")
      }
    });

    return () => {
      unsubscribe();

      // Clean up side effects or subscriptions here when the component unmounts
    };
  }, []);

  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <div className={styles.navbar}>
        <img
          src="https://i.ibb.co/xXPXQP0/logo.png"
          className={styles.logo}
        ></img>

        <div className={styles.navButtons}>
          <Link className={styles.navButtonElement} to={'/'}>
            Home
          </Link>
          <Link className={styles.navButtonElement} to={''}>
            About
          </Link>
          <Link className={styles.navButtonElement} to={''}>
            Contact Us
          </Link>
          <Link className={styles.navButtonElement} to={'/signup'}>
            Sign Up
          </Link>
          <button
            className={styles.navButtonLoginElement}
            onClick={() => {
              navigate('/login');
            }}
          >
            <a>Login</a>
          </button>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.mainContentTextContainer}>
          <h1 className={styles.title}>
            Fully Managed Cloud & <br></br>Web Hosting
          </h1>

          <p className={styles.paragraph}>
            Dedicated resources, full root access, & easy scaling. It’s the
            virtual private server you’ve been craving
          </p>

          <button
            className={styles.mainButton}
            onClick={() => {
              navigate('/signup');
            }}
          >
            Get Started
          </button>
        </div>

        <img
          className={styles.mainContentIllustration}
          src="https://i.ibb.co/5hFX8nB/illustration.png"
        ></img>
      </div>
    </div>
  );
}

export default App;
