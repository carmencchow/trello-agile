const express = require("express");
const auth = require("../middleware/auth");

const {
  getCard,
  getCards,
  archiveCard,
  createCard,
  createComment,
  updateCardName,
  updateColor,
  deleteCard,
} = require("../controllers/cardController");

const router = express.Router();

router.get("/", auth, getCards);
router.get("/:id", auth, getCard);
router.post("/", auth, createCard);
router.post("/:id/comment", auth, createComment);
router.put("/:id/color", auth, updateColor);
router.put("/:id", auth, updateCardName);
router.delete("/:id", auth, deleteCard);
router.get("/archive/:id", auth, archiveCard);

module.exports = router;
