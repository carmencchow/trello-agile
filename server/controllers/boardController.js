const Board = require('../models/boardModel');
const mongoose = require('mongoose');


// GET board
const getBoard = async (req, res) => {
  console.log('getting board')
}

// GET boards
const getBoards = async (req, res) => {
  console.log('getting all boards')
  try {
    const boards = await Board.find({}).sort({ name: 1})
    res.status(200).json(boards)
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  }

// CREATE board
const createBoard = async (req, res) => {}


// DELETE board
// STAR board?

module.exports = { getBoard, getBoards, createBoard }