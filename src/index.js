import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import route from "./routers/index.js";
import db from "./config/database/index.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const PORT = process.env.PORT || 5000;

//Config dotenv
dotenv.config();

//CORS
app.use(cors());

//Connect to DB
await db.connect();

//HTTP logger
// app.use(morgan("combined"));

//Body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// // Connection and disconnection events
// io.on("connection", (socket) => {
//   console.log(`A user connected ${socket.id}`);
//   socket.on("disconnect", () => {
//     console.log(`User ${socket.id} disconnected`);
//   });
// });

// //SocketIO
// app.set("socketio", io);

// // Create a middleware to add the io object to each request
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

//Route
route(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Link: https://localhost:${PORT}/api/v1`);
});
