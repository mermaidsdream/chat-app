// src/components/CreateChat.js
import { useState } from 'react';
import { createChat } from '../api/chatApi';

export const CreateChat = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleCreateChat = async () => {
    const newChat = { firstName, lastName };
    try {
      const chat = await createChat(newChat);
      console.log('Chat created:', chat);
      // Update state or UI as needed
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={handleCreateChat}>Create Chat</button>
    </div>
  );
};
