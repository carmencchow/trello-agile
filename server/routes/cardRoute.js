const express = require("express");
const auth = require("../middleware/auth");

const {
  getCard,
  getCards,
  archiveCard,
  createCard,
  addComment,
  updateCardName,
  updateColor,
  deleteCard,
} = require("../controllers/cardController");

const router = express.Router();

//localhost:5000/api/card
router.get("/", auth, getCards);
router.get("/:id", auth, getCard);
router.post("/", auth, createCard);
router.post("/:id/add-comment", auth, addComment);
router.put("/:id/color", auth, updateColor);
router.put("/:id", auth, updateCardName);
router.delete("/:id", auth, deleteCard);
router.get('/archive/:id', auth, archiveCard);

module.exports = router;
