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
router.get("/", auth, getBoards);
router.get("/:id", auth, getBoard);
router.post("/", auth, createBoard);
router.delete("/:id", auth, deleteBoard);
router.put("/:id", auth, updateBoardName);

// router.get('/?active=true', getArchive)
// http://localhost:5000/api/board/active=true

// GET by :id
module.exports = router;
