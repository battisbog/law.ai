import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../firebase';
import './Profile.css'; // Import the CSS file


function Profile() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      const userRef = firestore.collection('users').doc(user.uid);

      userRef.get().then((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
        }
      }).catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }, [user]);

  return (
    <div className="profileContainer">
      {userData && (
        <div className="profileContent">
          <div className="profilePhoto">
            <img src={userData.photoURL} alt="Profile" />
          </div>
          <div className="profileInfo">
            <h2>{userData.displayName}</h2>
            <p>Email: {userData.email}</p>
            <p>Joined: {userData.createdAt.toDate().toLocaleDateString()}</p>
            {/* Add more profile information as needed */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
