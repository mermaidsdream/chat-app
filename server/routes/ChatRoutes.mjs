import express from 'express';

import Chat from '../models/Chat.mjs';
import Message from '../models/Message.mjs';

const router = express.Router();

// Get all chats
// router.get('/', async (req, res) => {
//   const chats = await Chat.find().populate('messages');
//   res.json(chats);
// });

router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find().populate('messages');
    res.status(200).json(chats);
  } catch (error) {
    console.error('Failed to fetch chats', error);
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

// Route to get messages by chat ID
router.get('/:chatId/messages', async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Failed to fetch messages', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Create a new chat
// router.post('/', async (req, res) => {
//   const newChat = new Chat(req.body);
//   const chat = await newChat.save();
//   res.json(chat);
// });

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newChat = await Chat.create({ name });
    res.status(201).json(newChat);
  } catch (error) {
    console.error('Failed to create chat', error);
    res.status(500).json({ error: 'Failed to create chat' });
  }
});

// Add a message to a chat
router.post('/:chatId/messages', async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  const newMessage = new Message(req.body);
  const message = await newMessage.save();
  chat.messages.push(message);
  await chat.save();
  res.json(message);
});

// Handle message sending
// router.post('/send-message', async (req, res) => {
//   const { chatId, message } = req.body;

//   try {
//     // Save the message to the chat
//     const chat = await Chat.findById(chatId);
//     chat.messages.push({ text: message, sender: 'user' });
//     await chat.save();

//     // Wait for 3 seconds before sending the auto-response
//     setTimeout(async () => {
//       // Fetch a random quote from the API
//       const quoteResponse = await axios.get('https://api.quotable.io/random');
//       const quote = quoteResponse.data.content;

//       // Save the auto-response message to the chat
//       chat.messages.push({ text: quote, sender: 'auto-response' });
//       await chat.save();

//       // Notify the client that the auto-response is available
//       res.json({ success: true, message: 'Message sent and auto-response received.', quote });
//     }, 3000);

//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error sending message.', error: error.message });
//   }
// });

export default router;
