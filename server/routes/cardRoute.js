const express = require("express");
const auth = require("../middleware/auth");

const {
  getCard,
  getCards,
  createCard,
  updateMembers,
  updateCardName,
  getMembersFromCard,
  deleteCard,
  deleteMembers,
} = require("../controllers/cardController");

const router = express.Router();

//localhost:5000/api/card
router.get("/", auth, getCards);
router.get("/:id", getCard);
router.post("/", auth, createCard);
router.delete("/:id", deleteCard);
router.put("/:id", updateCardName);
router.get("/members/:id", getMembersFromCard);
router.delete("/members/:id", deleteMembers);
router.put("/members/:id", updateMembers);

// ARCHIVE CARD????

module.exports = router;
