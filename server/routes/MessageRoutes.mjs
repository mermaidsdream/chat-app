import express from 'express';
import axios from 'axios';

import Chat from '../models/Chat.mjs';
import Message from '../models/Message.mjs';

const router = express.Router();

// Send a message
router.post('/:chatId/messages', async (req, res) => {
  const { chatId, sender, text } = req.body;

  try {
    const newMessage = await Message.create({ chatId, sender, text });
    await Chat.findByIdAndUpdate(chatId, { $push: { messages: newMessage._id } });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Failed to send message', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Handle message sending
router.post('/:chatId/messages', async (req, res) => {
  const { chatId, message } = req.body;

  try {
    // Save the message to the chat
    const chat = await Chat.findById(chatId);
    chat.messages.push({ text: message, sender: 'user' });
    await chat.save();

    // Wait for 3 seconds before sending the auto-response
    setTimeout(async () => {
      // Fetch a random quote from the API
      const quoteResponse = await axios.get('https://api.quotable.io/random');
      const quote = quoteResponse.data.content;

      // Save the auto-response message to the chat
      chat.messages.push({ text: quote, sender: 'auto-response' });
      await chat.save();

      // Notify the client that the auto-response is available
      res.json({ success: true, message: 'Message sent and auto-response received.', quote });
    }, 3000);

  } catch (error) {
    console.error('Error sending message.', error);
    res.status(500).json({ success: false, message: 'Error sending message.', error: error.message });
  }
});

export default router;