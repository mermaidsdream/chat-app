import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server as socketIo } from 'socket.io';

import chatRoutes from '../routes/ChatRoutes.mjs';
import messageRoutes from '../routes/MessageRoutes.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create server using http
const server = http.createServer(app);

// Initialize socket.io
const io = new socketIo(server);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // to delete
// app.use(cors(
//   {
//     origin: ["https://chat-app-full-stack.vercel.app"],
//     methods: ["POST", "GET"],
//     credentials: false
//   }
// ));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));

// Routes
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

// Example to delete
// app.get('/api/users', (request, response) => {
//   response.send(mockChats);
// })

// app.get('/api/users/:id', (request, response) => {
//   console.log(request.params);
//   const parsedId = parseInt(request.params.id);
//   if (isNaN(parsedId)) {
//     return response.status(400).send({ msg: 'Bad request. Invalid ID' })
//   }

//   const findUser = mockChats.find((user) => user.id === parsedId)
//   if (!findUser) {
//     return response.sendStatus(404);
//   }
//   return response.send(findUser);
// })

// Creating new chat
app.post('/api/chats', async (req, res) => {
  const { name } = req.body;

  try {
    const newChat = await Chat.create({ name, lastMessage: '', time: new Date() });
    console.log("i am new chat: ", newChat);
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create chat' });
  }
});

// Toast new messages notification
app.post('/messages', async (req, res) => {
  const { id, senderName, text } = req.body;
  try {
    const newMessage = await Message.create({ id, senderName, text });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Creating new messages
app.post('/api/:chatId/messages', async (req, res) => {
  const { chatId, sender, text } = req.body;

  try {
    const message = {
      chatId,
      sender,
      text,
      time: new Date(),
    };

    const savedMessage = await Message.create(message);

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
