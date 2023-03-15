const List = require('../models/listModel');
const Board = require('../models/boardModel')
const mongoose = require('mongoose');

// GET ALL lists
// TODO: Return lists by board id?
const getLists = async (req, res) => {
  try {
    const lists = await List.find({}).sort({ timestamp: 1})
    res.status(200).json({ message: 'Returning all lists', lists })
    } catch (err) {
      res.sendStatus(500).json({ message: 'Error getting lists' });
    }
}

// GET A list
const getList = async (req, res) => {
  try {
    const list = await List.findOne({_id: req.params.id});
    if(!list){
      return res.status(404).send({ message: 'list not found' });
    }
    return res.status(200).send({ message: 'Returning list', list });
  } catch (err){
    return res.status(500).send(err);
  }
}

// DELETE list????????
// TODO: DELETING A LIST(S) BY BOARD NAME/ID
const deleteList = async (req, res) => {
  try {
    const listId = await List.findOneAndDelete({_id: req.params.id });
    if(!listId){
      return res.status(404).send('List not found');
    }
    return res.send('List deleted from board');
  } catch (err) {
    return res.status(500).send({ message: 'Error deleting list'})
  }
}

// CREATE list
const createList = async (req, res) => {
  
  // TODO: Create list by boardId 
  const name = req.body.name;
  // TEST boardID = 410be1bd191d4316952c9fa
  const boardId = req.body.boardId; 
  try{
    const result = await List.create({ name: name, owner: boardId });
    return res.status(201).send({ messagin: "New list created", result });
  } catch (err){
    return res.status(500).send({ message: 'Error: Unable to create list.  '})
  }
} 

// TODO: UPDATE list: name (String)
const updateListName = async (req, res) => {
  const { id, title } = req.body
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send({ message: 'Invalid list id' })
  }
  try {
    const list = await List.findOneAndUpdate({ _id: id }, { title }, { new: true })
    console.log(list._id, list.title)
    res.status(200).send({ message: 'List name updated', list })
  } catch (err) {
    res.status(500).send({ message: 'Error occurred while trying to update name'})
  }
}


// UPDATE cards (Array)???

// UPDATE owner (Object_id) ???

// MOVE list??

// ARCHIVE list??

module.exports = { createList, getList, getLists, deleteList, updateListName }