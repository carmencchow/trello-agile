const Board = require("../models/boardModel");
const mongoose = require("mongoose");

// GET A board (working)
const getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({_id: req.params.id});
    if(!board){
      return res.status(404).send({ message: 'Board not found' });
    }
    return res.status(200).send({ message: 'Returning board', board });
  } catch (err){
    return res.status(500).send(err);
  }
};

// GET ALL boards (working)
const getBoards = async (req, res) => {
  console.log('Getting all boards')
  try {
    const boards = await Board.find({}).sort({ name: 1 })
    res.status(200).json({ message: 'Showing all boards in the workspace', boards })
    } catch (err) {
      res.sendStatus(500).json({ message: 'No boards to show' });
    }
  }
};

// CREATE board (working)
const createBoard = async (req, res) => {
  const title = req.body.title;
  try {
    const newBoard = await Board.create({
      title: title,
      user: [],
      lists: [],
    });
    await newBoard.save();
    return res.status(201).send({ message: "Creating board", newBoard });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Board not created " });
  }
};


// DELETE A BOARD (working)
const deleteBoard = async (req, res) => {
  try {
    const boardId = await Board.findOneAndDelete({ _id: req.params.id });
    if (!boardId) {
      return res.status(404).send("Board not found");
    }
    return res.send("Board deleted");
  } catch (err) {
    return res.status(500).send({ message: 'Error deleting board'});
  }
}

// UPDATE a board's name (working)
const updateBoardName = async (req, res) => {
  const { id, title } = req.body
  try {
    const board = await Board.findOneAndUpdate({ id: id }, { title }, { new: true })
    console.log(board._id, board.title)
    res.status(200).send({ message: 'Board name updated', board })
  } catch (err) {
    res.status(500).send({ message: 'Error occurred while trying to update the name'})
  }
};

module.exports = { getBoard, updateBoardName, getBoards, createBoard, deleteBoard }
