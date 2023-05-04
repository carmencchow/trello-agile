const Board = require("../models/boardModel");
const User = require("../models/userModel");
const List = require("../models/listModel");
const Card = require("../models/cardModel");

// GET a board by id
const getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.id }).populate({
      path: "lists",
      populate: {
        path: "cards",
      },
    });
    if (!board) {
      return res.status(404).send({ message: "Board not found" });
    }
    return res.status(200).send({ message: "Returning board", board });
  } catch (err) {
    return res.status(500).send(err);
  }
};

// When button is clicked: return Archived cards
const getArchived = async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.id }).populate({
      path: "lists",
      populate: {
        match: { isArchived: true },
        path: "cards",
      },
    });
    return res.status(200).send({ message: "Returning board", board });
  } catch (err) {
    return res.status(500).send(err);
  }
};

// GET ALL boards
const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({})
      .sort({ name: 1 })
      .populate({
        path: "lists",
        populate: {
          path: "cards",
        },
      });
    if (!boards) {
      return res.sendStatus(500).json({ message: "No boards to show" });
    }
    return res.status(200).json(boards);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// CREATE board
const createBoard = async (req, res) => {
  const title = req.body.title;

  try {
    const existingBoard = await Board.collection.findOne({ title: title });
    if (existingBoard) {
      console.log("board already exists");
      return res.sendStatus(200); //Stop here, new board not created
    }

    const user = await User.findById({ _id: req.user.id });

    const newBoard = await Board.create({
      title: title,
      user: [user._id],
      background: "background13.jpg",
    });

    const todoList = await List.create({
      name: "To Do",
      board: newBoard._id,
    });

    const doingList = await List.create({
      name: "Doing",
      board: newBoard._id,
    });

    const doneList = await List.create({
      name: "Done 🎉",
      board: newBoard._id,
    });

    newBoard.lists = [todoList._id, doingList._id, doneList._id];

    await newBoard.save();
    user.boards.push(newBoard._id);
    user.lists.push(todoList._id, doingList._id, doneList._id);
    await user.save();
    return res.status(201).send({ message: "Creating board", newBoard });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Board not created " });
  }
};

// CHANGE board background
const updateBackground = async (req, res) => {
  console.log("newbackground");
  const newBackground = req.body.background;
  try {
    const board = await Board.findById({ _id: req.params.id });
    board.background = newBackground;
    await board.save();
    console.log(board.background);
    return res.status(200).send({ message: "Board background updated" });
  } catch (err) {
    console.log(err);
  }
};

// DELETE A BOARD
const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete({ _id: req.params.id });
    if (!board) {
      return res.status(404).send("Board not found");
    }
    const lists = await List.find({ board: req.params.id });
    const listIds = lists.map((list) => list._id);
    await Card.deleteMany({ parentList: { $in: listIds } });
    await List.deleteMany({ board: req.params.id });
    await User.updateMany(
      { boards: req.params.id },
      { $pull: { boards: req.params.id } }
    );
    return res.send("Board deleted");
  } catch (err) {
    return res.status(500).send({ message: "Error deleting board" });
  }
};

module.exports = {
  getArchived,
  getBoard,
  updateBackground,
  getBoards,
  createBoard,
  deleteBoard,
};
