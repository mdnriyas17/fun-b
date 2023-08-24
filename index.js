
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://64e73ea8b68285742d1beb6c--imaginative-sunshine-714e8a.netlify.app/",
    methods: ["GET", "POST"],
  },
});
app.get("/", function (req, res) {
    res.send("<h1>Simple Chat App Server...</h1>");
  });
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
})