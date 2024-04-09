// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, MessageCircle, User } from 'lucide-react'; // Import Lucid icons
import './Sidebar.css';
import SignOut from '../SignOut/SignOut'; // Import SignOut component

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderLink = (to, icon, text) => (
    <Link to={to} className={`sidebar-link ${!isSidebarOpen ? 'contracted' : ''}`}>
      {React.createElement(icon, { size: 24 })} {/* Use Lucid icon */}
      {isSidebarOpen && text}
    </Link>
  );

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </div>
      <nav>
        <ul>
          {renderLink('/', Home, 'Home')}
          {renderLink('/chat', MessageCircle, 'Chat App')}
          {renderLink('/profile', User, 'Profile')}

          {isSidebarOpen && (
            <li>
              <SignOut />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
