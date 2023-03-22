const List = require("../models/listModel");
const User = require("../models/userModel");
const Board = require("../models/boardModel");
// const Card = require("../models/cardModel");

// GET all lists (working)
const getLists = async (req, res) => {
  try {
    const lists = await List.find({}).sort({ timestamp: 1 });
    res.status(200).json({ message: "Returning all lists", lists });
  } catch (err) {
    res.sendStatus(500).json({ message: "Error getting lists" });
  }
};

// GET a list (working)

const getList = async (req, res) => {
  try {
    const list = await List.findOne({ _id: req.params.id });
    if (!list) {
      return res.status(404).send({ message: "list not found" });
    }
    return res.status(200).send({ message: "Returning list", list });
  } catch (err) {
    console.log(err);
    return res.status(500).send("No lists found");
  }
};

// DELETING a list
const deleteList = async (req, res) => {
  const listId = req.params.id;
  console.log(listId);
  try {
    const deletedList = await List.findByIdAndDelete({ _id: listId });
    if (!deletedList) {
      res.status(404).send("List item not found.");
    }
    const users = await User.find({ lists: listId });

    await Promise.all(
      users.map(async (user) => {
        user.lists.pull(listId);
        await user.save();
      })
    );
    await Board.updateMany({ lists: listId }, { $pull: { lists: listId } });
    // await Card.deleteMany({ parentList: listId });
    return res.send("List deleted.");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error deleting list" });
  }
};

// CREATE list
const createList = async (req, res) => {
  const name = req.body.name;
  const boardId = req.query.boardId;
  // get board ID from URL parameter
  try {
    const newList = await List.create({
      name: name,
      cards: [],
      board: boardId,
    });
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).send({ message: "Board not found" });
    }
    board.lists.push(newList._id);
    await board.save();

    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    user.lists.push(newList._id);
    await user.save();
    return res.status(201).send({ message: "New list created", newList });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Unable to create list." });
  }
};

// UPDATE name
const updateListName = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).send("No name for list");
    }
    const list = await List.findById({ _id: req.params.id });
    if (!list) {
      return res.status(404).send("No list found");
    }
    list.name = name;
    await list.save();
    res.status(200).send({ message: "List name updated", list });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Error occurred while trying to update name" });
  }
};

module.exports = { createList, getList, getLists, deleteList, updateListName };
