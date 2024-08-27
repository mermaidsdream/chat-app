import { useState } from 'react';
import axios from 'axios';

import { IoMdPersonAdd } from "react-icons/io";

import './AddChatForm.css';

export const AddChatForm = ({ onAddChat }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [chatName, setChatName] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (chatName.trim() === '') return;

    //     // Create a new chat object with all properties
    //     const newChat = {
    //         id: Date.now(),
    //         name: chatName,
    //         lastMessage: '',
    //         time: new Date().toLocaleString()
    //     };

    //     onAddChat(newChat);
    //     setChatName('');
    //     setIsAdding(false); // Hide input after adding
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (chatName.trim() === '') return; // Prevent creating a chat with an empty name

        try {
          const response = await axios.post('http://localhost:5000/api/chats', {
            name: chatName,
          });

          if (response.status === 201) {
            onAddChat(response.data); // Pass the newly created chat to the parent component
          } else {
            console.error('Chat not created');
          }
        } catch (error) {
          console.error('Failed to create chat', error);
        }

        setChatName(''); // Clear the input field
        setIsAdding(false); // Hide input after adding
      };


    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleInputChange = (e) => {
        setChatName(e.target.value);
    };

    // const handleAddChat = () => {
    //     if (chatName.trim() !== '') {
    //       onAddChat(chatName);
    //       setChatName(''); // Clear the input after adding
    //       setIsAdding(false); // Hide input after adding
    //     }
    // };

    const handleCancel = () => {
        setIsAdding(false);
        setChatName(''); // Clear the input when canceling
    };

    return (
        <>
            {!isAdding ? (
                <button onClick={handleAddClick} className='chat-add-button'>
                  <IoMdPersonAdd className='chat-add-button-icon' />
                </button>
            ) : (
                <>
                <form onSubmit={handleSubmit} className='chat-form'>
                <input
                  className='chat-form-input'
                  type="text"
                  value={chatName}
                  onChange={handleInputChange}
                  placeholder="Enter chat name"
                />
                <button className='chat-form-button-submit' type="submit">Add</button>
                <button onClick={handleCancel} className='chat-form-button-cancel'>Cancel</button>
                </form>
                </>
            )}
        </>
    );
};
