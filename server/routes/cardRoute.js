const express = require("express");
const auth = require("../middleware/auth");

const {
  getCard,
  getCards,
  getFilteredCards,
  createCard,
  updateMembers,
  updateCardName,
  getMembersFromCard,
  deleteCard,
  deleteMembers,
} = require("../controllers/cardController");

const router = express.Router();

//localhost:5000/api/card
router.get("/", getCards);
// router.get("/", auth, getCards);
router.get("/:id", auth, getCard);
router.get('/filter/:id', getFilteredCards);
// router.get('/filter/:id', auth, getFilteredCards);
router.post("/", auth, createCard);
router.delete("/:id", auth, deleteCard);
router.put("/:id", auth, updateCardName);

// Are we going to use these endpoints for the MVP?
router.get("/members/:id", auth, getMembersFromCard);
router.delete("/members/:id", auth, deleteMembers);
router.put("/members/:id", auth, updateMembers);

module.exports = router;
