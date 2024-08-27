import { useState, useEffect } from 'react';

import { AddChatForm } from '../../components/AddChatForm/AddChatForm';
import { ChatList } from '../../components/ChatList/ChatList';
import { ChatWindow } from '../../components/ChatWindow/ChatWindow';

import { fetchChats, fetchMessagesByChatId, fetchRandomQuote } from '../../api/ChatApi';

import './MainPage.css';

export const MainPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await fetchChats();
        setChats(data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    }
    getChats();
  }, []);

  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);
    console.log("I am handle select chat ", chat.id)
    try {
      const chatMessages = await fetchMessagesByChatId(chat.id);
      console.log("I am chatMessages :", chatMessages);
      setMessages(chatMessages);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const onSendMessage = (newMessage) => {
    const message = { text: newMessage, time: new Date().toLocaleString(), isOwn: true };
    setMessages([...messages, message]);

    // Trigger auto-response
    onAutoResponse();
  };

  const onAutoResponse = () => {
    setTimeout(async () => {
      try {
        const response = await fetchRandomQuote();
        const quoteMessage = {
          text: response.content, // Assuming the API returns quote text in 'content'
          time: new Date().toLocaleString(),
          isOwn: false,
        };
        setMessages((prevMessages) => [...prevMessages, quoteMessage]);
      } catch (error) {
        console.error('Error fetching auto-response:', error);
      }
    }, 3000); // 3-second delay
  };

  const searchHandler = (searchItem) => {
    setSearchItem(searchItem);
    if (searchItem !== '') {
      const newChatList = chats.filter((chat) => {
        return Object.values(chat).join(' ').toLowerCase().includes(searchItem.toLowerCase());
      })
      setSearchResults(newChatList);
    } else {
      setSearchResults(chats);
    }
  };

  const handleAddChat = (newChat) => {
    setChats([...chats, newChat]);
  };

  const handleDeleteChat = (id) => {
      setChats((prevChats) => {
      const updatedChats = prevChats.filter(chat => chat.id !== id);

      // Debugging
      console.log('Deleted Chat ID:', id);
      console.log('Selected Chat:', selectedChat);
      console.log('Updated Chats:', updatedChats);

      // Check if the deleted chat is the currently selected chat
      if (selectedChat && selectedChat.id === id) {
        console.log('Deselecting chat');
        setSelectedChat(null); // Deselect the chat
        setMessages([]); // Clear the messages
      }

      return updatedChats;
    });
  }

  const handleEditChat = (id) => {
    const chatToEdit = chats.find(chat => chat.id === id);
    const updatedChatName = prompt("Edit chat name:", chatToEdit.name);
    if (updatedChatName) {
      setChats(chats.map(chat => chat.id === id ? { ...chat, name: updatedChatName } : chat));
    }
  };

  return (
    <div className="main-page">
      <AddChatForm onAddChat={handleAddChat} />
      <ChatList searchItem={searchItem} searchHandler={searchHandler} chats={searchItem.length < 1 ? chats : searchResults} onSelectChat={handleSelectChat} onDeleteChat={handleDeleteChat} onEditChat={handleEditChat} />
      <ChatWindow messages={messages} selectedChat={selectedChat} onSendMessage={onSendMessage} />
    </div>
  );
};
