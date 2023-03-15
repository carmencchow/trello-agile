const List = require('../models/listModel');
const mongoose = require('mongoose');

// GET all lists (working)
const getLists = async (req, res) => {
  try {
    const lists = await List.find({}).sort({ timestamp: 1})
    res.status(200).json({ message: 'Returning all lists', lists })
    } catch (err) {
      res.sendStatus(500).json({ message: 'Error getting lists' });
    }
}

// GET a list (working)
const getList = async (req, res) => {
  try {
    const list = await List.findOne({_id: req.params.id});
    if(!list){
      return res.status(404).send({ message: 'list not found' });
    }
    return res.status(200).send({ message: 'Returning list', list });
  } catch (err){
    console.log(err)
    return res.status(500).send('No lists found');
  }
}

// TODO: DELETING A LIST(S) BY BOARD NAME/ID
// SHOULD THIS JUST BE DELETE LIST WHEN CARD.LENGTH === 0;

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
  const name = req.body.name;
  try{
    const result = await List.create({ name: name });
    return res.status(201).send({ messagin: "New list created", result });
  } catch (err){
    return res.status(500).send({ message: 'Error: Unable to create list.  '})
  }
} 

// UPDATE name (working)
const updateListName = async (req, res) => {
  const { id, name } = req.body
  // if (!mongoose.Types.ObjectId.isValid(id)){
  //   return res.status(400).send({ message: 'Invalid list id' })
  // }
  try {
    const list = await List.findOneAndUpdate({ id: id }, { name }, { new: true })
    console.log(list._id, list.name)
    res.status(200).send({ message: 'List name updated', list })
  } catch (err) {
    res.status(500).send({ message: 'Error occurred while trying to update name'})
  }
}

module.exports = { createList, getList, getLists, deleteList, updateListName }