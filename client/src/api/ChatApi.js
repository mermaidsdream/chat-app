import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chats';

// Fetch all chats
// export const fetchChats = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching chats", error);
//     // throw error;
//     return [];
//   }
// };

// Fetch all chats
export const fetchChats = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.map(chat => ({
      id: chat.id,
      name: chat.name,
      avatar: chat.avatar,
      lastMessage: chat.lastMessage,
      time: chat.time,
    }));
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};

// Fetch specific chat
export const fetchMessagesByChatId = async (chatId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/chats/${chatId}/messages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    // throw error;
    return [];
  }
};

export const fetchRandomQuote = async () => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    return response.data;
  } catch (error) {
    console.error('Error fetching random quote:', error);
    return { content: 'Unable to fetch quote' };
  }
};

// Create a new chat
export const createChat = async (chatData) => {
  try {
    const response = await axios.post(API_URL, chatData);
    return response.data;
  } catch (error) {
    console.error("Error creating chat", error);
    throw error;
  }
};

// Add a message to a chat
export const addMessageToChat = async (chatId, messageData) => {
  try {
    const response = await axios.post(`${API_URL}/${chatId}/messages`, messageData);
    return response.data;
  } catch (error) {
    console.error("Error adding message to chat", error);
    throw error;
  }
};



