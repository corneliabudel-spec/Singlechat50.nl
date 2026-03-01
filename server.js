const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/singlechat', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Single Chat Server');
});

// Socket.io Setup
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
