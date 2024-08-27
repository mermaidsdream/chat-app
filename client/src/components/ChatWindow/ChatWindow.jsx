import { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ChatMessage } from '../ChatMessage/ChatMessage';
import { MessageInput } from '../MessageInput/MessageInput';

import avatar from '../../assets/images/avatar.png';
import './ChatWindow.css';

export const ChatWindow = ({ selectedChat, messages, onSendMessage }) => {
  const [localMessages, setLocalMessages] = useState(messages);
  const messagesEndRef = useRef(null);

  // Update localMessages whenever messages prop changes
  useEffect(() => {
    // Check if a new message has been added
    if (messages.length > localMessages.length) {
      const newMessage = messages[messages.length - 1];
      console.log('New message:', newMessage); // Debugging line
      console.log('Sender name', selectedChat.name);

      // Trigger a toast notification for the new message
      toast(`New message from ${selectedChat.name || 'Unknown Sender'}: ${newMessage.text}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setLocalMessages(messages);
  }, [messages, localMessages.length, selectedChat]);

  // Scroll to bottom when localMessages are updated
  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Effect to clear messages when selectedChat is null
  useEffect(() => {
    if (!selectedChat) {
      setLocalMessages([]); // Clear local messages if no chat is selected
    }
  }, [selectedChat]);

  if (selectedChat) {
    console.log(selectedChat.id);
    return (
      <>
      <div className="chat-window">
      <div className="chat-header-user">
        <img className='chat-header-photo' src={avatar} alt='user avatar' width={50} />
        <h3 className='chat-header-name'>{selectedChat.name}</h3>
      </div>
      <div className='chat-messages'>
        {localMessages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            selectedChat={selectedChat}
          />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
        <MessageInput selectedChat={selectedChat} chatId={selectedChat.id} onSendMessage={onSendMessage} />
      </div>
      <ToastContainer />
      </>
    )
  } else {
    return (
      <div className='chat-window'>
        <h2 className='chat-window-text'>Select a chat to start messaging</h2>
      </div>
    )
  }
};
