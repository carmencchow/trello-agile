const express = require("express");
const auth = require("../middleware/auth");

const {
  getBoard,
  starredBoard,
  getBoards,
  getArchived,
  createBoard,
  deleteBoard,
  updateBackground,
} = require("../controllers/boardController");

const router = express.Router();

// ROUTES '/api/board/'
router.get("/", auth, getBoards);
router.post("/", auth, createBoard);
router.get("/:id", auth, getBoard);
router.delete("/:id", auth, deleteBoard);
router.put("/:id/background", auth, updateBackground);
router.get("/:id/archived", auth, getArchived);
router.put("/:id/starred", auth, starredBoard);

module.exports = router;
