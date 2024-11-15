const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const { Server } = require("socket.io");
const http = require("http");
const reposeHandler = require("./services/responseHandler/send");
const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(reposeHandler);

// MongoDB connection
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`MongoDB is connected..🚀`))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/book", bookRoute);

// Handle Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

// Expose io to routes
app.set("io", io);

server.listen(PORT, () => {
  console.log(`Server is running on port 🚀 ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
