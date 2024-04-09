import React, { useRef, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './ChatRoom.css';
import ChatMessage from '../ChatMessage/ChatMessage';
import '../../App.css';

import OpenAI from "openai";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });


function ChatRoom() {
  const dummy = useRef();
  const [formValue, setFormValue] = useState('');
  const [user] = useAuthState(auth); // Use the imported auth

  // Update to use user-specific path if user is authenticated
  const userMessagesRef = user ? firestore.collection('users').doc(user.uid).collection('chatLogs') : null;
  const query = userMessagesRef ? userMessagesRef.orderBy('createdAt').limit(50) : null;

  const [messages] = useCollectionData(query, { idField: 'id' });

  const sendMessage = async (e) => {
    e.preventDefault();
  
    if (!user) {
      console.error("No authenticated user found!");
      return;
    }
  
    const { uid, photoURL, displayName } = user;
    const userMessagesRef = firestore.collection('users').doc(uid).collection('chatLogs');

    // Append the user's current message
    const conversationHistory = messages ? messages.map(msg => ({
      role: msg.uid === uid ? 'user' : 'assistant',
      content: msg.text,
    })) : [];

    conversationHistory.push({
      role: 'user',
      content: formValue,
    });

    // OpenAI Chat Completion
    try {
      const response = await openai.chat.completions.create({
        messages: conversationHistory,
        model: 'gpt-3.5-turbo',
      });

      const aiResponse = response.choices[0].message.content;

      // Add the user's message to Firestore
      await userMessagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        displayName,
      });

      // Add the AI-generated response to Firestore
      await userMessagesRef.add({
        text: aiResponse,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: 'assistant',
        photoURL: 'src/resources/logo192.png',
        displayName: 'Assistant',
      });

      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error generating AI response:', error);
    }
  };

  const clearMessages = async () => {
    try {
      if (!user) {
        console.error("No authenticated user found!");
        return;
      }
      const chatLogsRef = firestore.collection('users').doc(user.uid).collection('chatLogs');
      const snapshot = await chatLogsRef.get();
      snapshot.forEach((doc) => {
        doc.ref.delete();
      });
    } catch (error) {
      console.error('Error clearing messages:', error);
    }
  };

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatRoomContainer">
      <div className="chatContainer">
        {messages && messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <span ref={dummy}></span>
      </div>

      <form onSubmit={sendMessage} className="messageForm">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" disabled={!formValue}>Send</button>
      </form>
      <button className="clearButton" onClick={clearMessages}>Clear Messages</button>
    </div>
  );
}

export default ChatRoom;
