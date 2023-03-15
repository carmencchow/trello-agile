const Board = require('../models/boardModel');
const mongoose = require('mongoose');

// GET board
const getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({_id: req.params.id});
    if(!board){
      return res.status(404).send('Board not found');
    }
    return res.send('Returning board');
  } catch (err){
    return res.status(500).send(err);
  }
}

// GET boards
const getBoards = async (req, res) => {
  console.log('getting all boards')
  try {
    const boards = await Board.find({})
    // const boards = await Board.find({}).sort({ name: 1 })
    res.status(200).json(boards)
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  }

// CREATE board working
const createBoard = async (req, res) => {
  const title = req.body.title;

  
  try {
    const result = await Board.create({ title });
    return res.status(201).send({ message: 'Creating board', result});
  } catch (err) {
    return res.status(500).send({ message: 'Board not created '});
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

module.exports = { getBoard, getBoards, createBoard, deleteBoard }