const express = require("express");
const app = require('express')();
const server = require('http').Server(app);
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require('dotenv').config({ path: "./config.env" });
const connectDb = require('./utilsServer/connectDb');
connectDb();
app.use(express.json());
const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  app.use("/api/signup", require("./api/signup"));
  app.use("/api/auth", require("./api/auth"));
  app.use("/api/search", require("./api/search"));
  app.use("/api/posts", require("./api/posts"));
  app.use("/api/profile", require("./api/profile"));
  app.use("/api/notifications", require("./api/notifications"));
    
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
