const express = require("express");
const auth = require("../middleware/auth");

// import functions from boardController
const {
  getBoard,
  getBoards,
  createBoard,
  deleteBoard,
  updateBoardName,
  updateCards,
} = require("../controllers/boardController");

const router = express.Router();

// ROUTES '/api/board/'
router.get("/", auth, getBoards);
router.get("/:id", auth, getBoard);
router.post("/", auth, createBoard);
router.delete("/:id", auth, deleteBoard);
router.put("/:id", auth, updateBoardName);
router.put("/:id/lists/:listId/cards", auth, updateCards);

// GET by :id
module.exports = router;
