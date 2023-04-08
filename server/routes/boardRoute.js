const express = require("express");
const auth = require("../middleware/auth");

// import functions from boardController
const {
  getBoard,
  getBoards,
  getArchived,
  createBoard,
  deleteBoard,
  updateBoardName,
} = require("../controllers/boardController");

const router = express.Router();

// ROUTES '/api/board/'
router.get("/", getBoards);
router.get("/:id", auth, getBoard);
router.post("/", auth, createBoard);
router.delete("/:id", auth, deleteBoard);
router.put("/:id", auth, updateBoardName);
router.get("/:id/archived", auth, getArchived); 

module.exports = router;
