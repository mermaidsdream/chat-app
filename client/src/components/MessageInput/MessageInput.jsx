import { useState } from 'react';
import axios from 'axios';

import { IoIosArrowForward } from "react-icons/io";

import './MessageInput.css';

export const MessageInput = ({ chatId, onSendMessage, selectedChat }) => {
  const [message, setMessage] = useState('');

  // const handleSend = () => {
  //   if (message.trim()) {
  //     onSendMessage(message);
  //     setMessage('');
  //   }
  // };

  const handleSendMessage = async () => {
    if (message.trim() === '') return; // Prevent sending empty messages

    try {
      const response = await axios.post('/api/:chatId/messages', { //http://localhost:5000/api/messages
        chatId: selectedChat.id,
        sender: selectedChat.name, // the actual sender
        text: message,
      });

      if (response.status === 201) {
        onSendMessage(response.data); // Pass the newly created message to the parent component
      } else {
        console.error('Message not sent');
      }
    } catch (error) {
      console.error('Failed to send message', error);
    }

    setMessage(''); // Clear the input field after sending
  };

  return (
    <div className="input-box">
      <input
        className='input-box-message'
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <button type='submit' title='send message' className='input-box-button' onClick={handleSendMessage}>
        <IoIosArrowForward className='button-style' />
      </button>
    </div>
  );
};
