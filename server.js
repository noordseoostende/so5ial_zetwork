const express = require("express");
const app = require('express')();
const server = require('http').Server(app);
const io = require("socket.io")(server);
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require('dotenv').config({ path: "./config.env" });
const connectDb = require('./utilsServer/connectDb');
connectDb();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const { addUser, removeUser, findConnectedUser } = require("./utilsServer/roomActions");
const {
  loadMessages,
  sendMsg,
  setMsgToUnread,
  deleteMsg
} = require("./utilsServer/messageActions");

io.on("connection", socket => {
  socket.on("join", async ({ userId }) => {
    const users = await addUser(userId, socket.id);
    console.log(users);

    setInterval(() => {
      socket.emit("connectedUsers", {
        users: users.filter(user => user.userId !== userId)
      });
    }, 10000);
  });

  socket.on("sendNewMsg", async ({ userId, msgSendToUserId, msg }) => {
    const { newMsg, error } = await sendMsg(userId, msgSendToUserId, msg);
    const receiverSocket = findConnectedUser(msgSendToUserId);

    if (receiverSocket) {
      // WHEN YOU WANT TO SEND MESSAGE TO A PARTICULAR SOCKET
      io.to(receiverSocket.socketId).emit("newMsgReceived", { newMsg });
    }
    //
    else {
      await setMsgToUnread(msgSendToUserId);
    }

    !error && socket.emit("msgSent", { newMsg });
  });

  socket.on("deleteMsg", async ({ userId, messagesWith, messageId }) => {
    const { success } = await deleteMsg(userId, messagesWith, messageId);

    if (success) socket.emit("msgDeleted");
  });

  socket.on("sendMsgFromNotification", async ({ userId, msgSendToUserId, msg }) => {
    const { newMsg, error } = await sendMsg(userId, msgSendToUserId, msg);
    const receiverSocket = findConnectedUser(msgSendToUserId);

    if (receiverSocket) {
      // WHEN YOU WANT TO SEND MESSAGE TO A PARTICULAR SOCKET
      io.to(receiverSocket.socketId).emit("newMsgReceived", { newMsg });
    }
    //
    else {
      await setMsgToUnread(msgSendToUserId);
    }

    !error && socket.emit("msgSentFromNotification");
  });

  socket.on("disconnect", () => removeUser(socket.id));
});

nextApp.prepare().then(() => {
  app.use("/api/signup", require("./api/signup"));
  app.use("/api/auth", require("./api/auth"));
  app.use("/api/search", require("./api/search"));
  app.use("/api/posts", require("./api/posts"));
  app.use("/api/profile", require("./api/profile"));
  app.use("/api/notifications", require("./api/notifications"));
  app.use("/api/chats", require("./api/chats"));
  app.use("/api/reset", require("./api/reset"));
    
  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, err => {
    if (err) throw err;
    console.log("Express server running");
  });
});

// mongodb+srv://romeo:raffael@olmec.8c71i.mongodb.net/Medison?retryWrites=true&w=majority
// jwtSecret=Adam

// mongodb+srv://Leo:leo123456@triade.dxhqz.mongodb.net/chaat?retryWrites=true&w=majority

// app.use('/api/auth', require('./api/auth'))
