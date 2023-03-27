require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const boardRoute = require("./routes/boardRoute");
const listRoute = require("./routes/listRoute");
const cardRoute = require("./routes/cardRoute");
const userRoute = require("./routes/userRoute");
const PORT = process.env.PORT || 5001;
const cors = require("cors");
const Board = require("./models/boardModel.js");
const List = require("./models/listModel");
const Card = require("./models/cardModel");
// Express app
const app = express();
const server = http.createServer(app);
// const io = require("socket.io")(server);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.set("io", io);

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log("message arrived at server");
    socket.broadcast.emit("receive_message", data);
  });
});

app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// const server = require("http").Server(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// app.set("io", io);

// io.on("connection", (socket) => {
//   console.log(`user connected: ${socket.id}`);

//   socket.on("send_update", (data) => {
//     socket.broadcast.emit("receive_update", data);
//   });
// });

// Routes
app.use("/api/board", boardRoute);
app.use("/api/list", listRoute);
app.use("/api/card", cardRoute);
app.use("/api/user", userRoute);

// Do not hit more than once unless you want more entries in the db.
app.get("/loaddata", async (req, res) => {
  try {
    // create 6 boards
    for (let i = 0; i < 6; i++) {
      const uniqueTitle = `Dummy-Board-${Date.now()}`;
      let board = new Board({
        title: uniqueTitle,
        user: [],
        lists: [],
        cards: [],
        boards: [],
        organization: "Parsity",
        // will be populated with lists in the same endpoint call
      });
      await board.save();
      // 3 lists
      for (let j = 0; j < 3; j++) {
        const uniqueName = `Dummy-List-${Date.now()}`;
        let list = new List({
          name: uniqueName,
          cards: [],
          board: board._id,
        });
        await list.save();
        board.lists.push(list._id);

        // 3 cards for per each list
        for (let k = 0; k < 3; k++) {
          const uniqueTitle = `Dummy-Card-${Date.now()}`;
          let card = new Card({
            title: uniqueTitle,
            description: "Your card description here",
            comment: "Your comments are going here!",
            parentList: [list._id],
            labels: [],
            members: [],
            dates: { startDate: null, dueDate: null },
          });
          // card.parentList.push(list._id);
          await card.save();
          list.cards.push(card._id);
        }
        await list.save();
      }
      await board.save();
    }
    res.send("Data loaded successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error loading data");
  }
});

// server.listen(3001, () => console.log("server is running"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`connected to db and listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
