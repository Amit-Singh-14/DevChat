import express from "express";
import { config } from "dotenv";
import connectDB from "./config/dbConnect.js";
import { chats } from "./data/data.js";
import path from "path";
import cors from "cors";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// env config
config();

// db conncection
await connectDB();

let corsOptions = {
  origin: ["http://localhost:5000", "https://devchat-8hye.onrender.com"],
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//testing route
app.get("/api", (req, res) => {
  res.json("heelo world from server");
});

// users routes
import userRouter from "./routes/user.route.js";
app.use("/api/v1/user", userRouter);

// chat routes
import chatRouter from "./routes/chat.route.js";
app.use("/api/v1/chat", chatRouter);

// message routes
import messageRouter from "./routes/message.route.js";
app.use("/api/v1/message", messageRouter);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------
//error middleware
app.use(notFound);
app.use(errorHandler);

const server = app.listen(process.env.PORT, () => {
  console.log("server running on port", process.env.PORT);
});

import { Server } from "socket.io";
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:5173", "https://devchat-8hye.onrender.com"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
  methods: ["GET", "POST"],
});

io.on("connection", (socket) => {
  console.log("connected to socket");
  socket.on("setup", (userdata) => {
    socket.join(userdata._id);
    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
    console.log("user joinded room:", room);
    // console.log(socket);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new-message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not presnet");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message-recieved", newMessageRecieved);
    });
  });
});

/*
app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singlechat = chats.find((c) => c._id === req.params.id);
  res.send(singlechat);
});
*/
