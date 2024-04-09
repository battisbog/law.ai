import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar'; // Adjust the path as needed
import ChatRoom from './components/ChatRoom/ChatRoom';
import SignIn from './components/SignIn/SignIn';
import HomePage from './components/HomePage/HomePage';
import SignOut from './components/SignOut/SignOut';
import Profile from './components/Profile/Profile';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import './App.css';

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <section>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={user ? <ChatRoom /> : <SignIn />} />
            <Route path="/profile" element={user ? <Profile /> : <SignIn />} />
            {/* Add more routes as needed */}
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
