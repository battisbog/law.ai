import React from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import './HomePage.css';

function HomePage() {
  const [user] = useAuthState(auth);

  return (
    <div className="homePageContainer">
      {user ? (
        // If user is signed in, show the actual content
        <div className="homePage">
          <h1>Welcome to Chat App</h1>
          <p>Connect with your friends and colleagues using our easy-to-use chat interface.</p>
          <div className="features">
            <div className="feature">
              <h3>Easy to Use</h3>
              <p>Our app is user-friendly and simple to navigate.</p>
            </div>
            <div className="feature">
              <h3>Real-Time Conversations</h3>
              <p>Enjoy real-time messaging with AI.</p>
            </div>
            <div className="feature">
              <h3>Secure</h3>
              <p>Your messages are securely encrypted and private.</p>
            </div>
          </div>
        </div>
      ) : (
        // If user is not signed in, show the SignIn component
        <SignIn />
      )}
    </div>
  );
}



export default HomePage;
