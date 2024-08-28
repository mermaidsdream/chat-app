import express from 'express';

import Chat from '../models/Chat.mjs';
import Message from '../models/Message.mjs';

const router = express.Router();

// Get all chats
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
router.post('/api/chats/:chatId/messages', async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  const newMessage = new Message(req.body);
  const message = await newMessage.save();
  chat.messages.push(message);
  await chat.save();
  res.json(message);
});

export default router;