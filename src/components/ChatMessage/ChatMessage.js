import React from 'react';
import { auth } from '../../firebase'; // Importing from firebase.js
import { MessageBox } from 'react-chat-elements';


function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    const currentUserUid = auth.currentUser ? auth.currentUser.uid : null;
    const messageClass = uid === currentUserUid ? 'sent' : 'received';
  
    return (
      <div className={`message ${messageClass}`}>
        
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="User" />
        <div>
          <p className="messageText">{text}</p>
        </div>
      </div>
    );
  }
  

export default ChatMessage;
