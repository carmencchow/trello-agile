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
  updateCardPosition,
} = require("../controllers/cardController");

const router = express.Router();

//localhost:5000/api/card
router.get("/", getCards);
router.get("/", auth, getCards);
router.get("/:id", auth, getCard);
router.post("/", auth, createCard);
router.delete("/:id", auth, deleteCard);
router.put("/:id", auth, updateCardName);
router.put("/position/:id", auth, updateCardPosition);

// Are we going to use these endpoints for the MVP?
router.get("/members/:id", auth, getMembersFromCard);
router.delete("/members/:id", auth, deleteMembers);
router.put("/members/:id", auth, updateMembers);

module.exports = router;
