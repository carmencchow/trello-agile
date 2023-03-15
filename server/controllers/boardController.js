const Board = require('../models/boardModel');
const mongoose = require('mongoose');

// GET board
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
}

// GET boards
const getBoards = async (req, res) => {
  console.log('Getting all boards')
  try {
    const boards = await Board.find({})
    // const boards = await Board.find({}).sort({ name: 1 })
    res.status(200).json({ message: 'Showing all boards in the workspace', boards })
    } catch (err) {
      res.sendStatus(500).json({ message: 'No boards to show' });
    }
  }

// CREATE board 
const createBoard = async (req, res) => {
  const title = req.body.title;
  // const titleExists = await Board.findById({ title: title })
  // if (!titleExists)
    try {
      const result = await Board.create({ title });
      return res.status(201).send({ message: 'Creating board', result});
    } catch (err) {
      return res.status(500).send({ message: 'Error: Board already exists.'});
    }
};

// DELETE board
const deleteBoard = async (req, res) => {
  try {
    const boardId = await Board.findOneAndDelete({_id: req.params.id });
    if(!boardId){
      return res.status(404).send('Board not found');
    }
    return res.send('Board deleted');
  } catch (err) {
    return res.status(500).send(err);
  }
}

// UPDATE board
const editBoardName = async (req, res) => {
  const { id, title } = req.body
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send({ message: 'Invalid board id' })
  }
  try {
    const board = await Board.findOneAndUpdate({ _id: id }, { title }, { new: true })
    console.log(board._id, board.title)
    res.status(200).send({ message: 'Board name updated', board })
  } catch (err) {
    res.status(500).send({ message: 'Error occurred while trying to update the name'})
  }
}

module.exports = { getBoard, editBoardName, getBoards, createBoard, deleteBoard }