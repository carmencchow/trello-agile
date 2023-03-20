const express = require("express");
const auth = require("../middleware/auth");

// import functions from boardController
const {
  getBoard,
  getBoards,
  createBoard,
  deleteBoard,
  updateBoardName,
} = require("../controllers/boardController");

const router = express.Router();

// ROUTES '/api/board/'
router.get("/", getBoards);
router.get("/:id", getBoard);
router.post("/", auth, createBoard);
router.delete("/:id", deleteBoard);
router.put("/:id", updateBoardName);

// GET by :id
module.exports = router;
