const Board = require("../models/boardModel");
const User = require("../models/userModel");
const List = require("../models/listModel");
const Card = require("../models/cardModel");

// GET A board (working)
// Since every user created at this point is a part of the Parsity organization, then we don't need to pull the user.boards to populate on the workspace screen? Technically every board should show up since they're all a part of parsity's organization.
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

// GET ALL boards (working)
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
    return res
      .status(200)
      .json({ message: "Showing all boards in the workspace", boards });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// CREATE board (working)
const createBoard = async (req, res) => {
  const title = req.body.title;
  try {
    const user = await User.findById({ _id: req.user.id });

    const newBoard = await Board.create({
      title: title,
      user: [user._id],
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
      name: "Done🎉",
      board: newBoard._id,
    });

    newBoard.lists = [todoList._id, doingList._id, doneList._id];

    await newBoard.save();
    user.boards.push(newBoard._id);
    await user.save();
    return res.status(201).send({ message: "Creating board", newBoard });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Board not created " });
  }
};

// DELETE A BOARD (working)
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

// UPDATE a board's name (working)
const updateBoardName = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(404).send("No title in board");
    }
    const board = await Board.findById({ _id: req.params.id });
    if (!board) {
      return res.status(404).send("Board not found");
    }
    board.title = title;
    await board.save();
    res.status(200).send({ message: "Board name updated", board });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Error occurred while trying to update the name" });
  }
};

module.exports = {
  getBoard,
  updateBoardName,
  getBoards,
  createBoard,
  deleteBoard,
};
