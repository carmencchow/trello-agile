const express = require("express");
const auth = require("../middleware/auth");

// import functions from boardController
const {
  getBoard,
  getBoards,
  getArchived,
  getUnArchived,
  createBoard,
  deleteBoard,
  updateBoardName,
} = require("../controllers/boardController");

const router = express.Router();

// ROUTES '/api/board/'
router.get("/", getBoards);
// router.get("/", auth, getBoards);
router.get("/:id", getBoard);
// router.get("/:id", auth, getBoard);
router.post("/", auth, createBoard);
router.delete("/:id", auth, deleteBoard);
router.put("/:id", auth, updateBoardName);
router.get("/archived/:id", getArchived); //When button is clicked ('isArchived=true&false')


// GET by :id
module.exports = router;
