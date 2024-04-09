// SignOut.js
import React from 'react';
import { auth } from '../../firebase'; // Adjust this path if necessary

const SignOut = () => {
  return auth.currentUser && (
    <button
      className="sign-out"
      onClick={() => auth.signOut()}
      style={{
        background: '#007bff',
        color: 'white',
        padding: '10px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        outline: 'none',
      }}
    >
      Sign Out
    </button>
  );
}

export default SignOut;
