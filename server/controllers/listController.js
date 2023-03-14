const List = require('../models/listModel');
const mongoose = require('mongoose');


// GET list
const getList = async (req, res) => {
  console.log('getting list')
}

// GET lists
const getLists = async (req, res) => {
  console.log('getting all lists')
  try {
    const lists = await List.find({}).sort({ name: 1})
    res.status(200).json(lists)
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
}

// DELETE list
const deleteList = async (req, res) => {
  console.log('deleting list')
}

// CREATE list
const createList = async (req, res) => {
  console.log('creating list')
}

// MOVE list
// ARCHIVE list

module.exports = { createList, getList, getLists, deleteList }