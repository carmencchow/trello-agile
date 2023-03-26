const express = require("express");
const auth = require("../middleware/auth");

const {
  getCard,
  getCards,
  archiveCard,
  createCard,
  updateMembers,
  updateCardName,
  // getMembersFromCard,
  deleteCard,
  deleteMembers,
} = require("../controllers/cardController");

const router = express.Router();

//localhost:5000/api/card
// router.get("/", auth, getCards);
// router.get("/:id", auth, getCard);
// router.post("/", auth, createCard);
// router.delete("/:id", auth, deleteCard);
// router.put("/:id", auth, updateCardName);
// router.get('/:id', auth, archiveCard);

router.get("/", getCards);
router.get("/:id", getCard);
router.post("/", createCard);
router.delete("/:id", deleteCard);
router.put("/:id", updateCardName);
router.get('/:id', archiveCard);

// Are we going to use these endpoints for the MVP?
// router.get("/members/:id", auth, getMembersFromCard);
router.delete("/members/:id", auth, deleteMembers);
router.put("/members/:id", auth, updateMembers);

module.exports = router;
