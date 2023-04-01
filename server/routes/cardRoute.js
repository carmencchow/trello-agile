const express = require("express");
const auth = require("../middleware/auth");

const {
  getCard,
  getCards,
  archiveCard,
  createCard,
  updateCardName,
  updateColor,
  deleteCard,

  addComment,
  editComment,
  deleteComment,

} = require("../controllers/cardController");

const router = express.Router();

//localhost:5000/api/card
router.get("/", auth, getCards);
router.get("/:id", getCard);
// router.get("/:id", auth, getCard);
router.post("/", auth, createCard);
// router.post("/:id/add-comment", auth, addComment);
// router.put("/:id/edit-comment/:id", auth, editComment);
// router.delete("/:id/delete-comment/:id", auth, deleteComment);
// router.put("/:id/color", auth, updateColor);
router.delete("/:id", auth, deleteCard);
router.put("/:id", auth, updateCardName);
router.get('/archive/:id', auth, archiveCard);
router.post("/:id/add-comment", addComment);
router.put("/:id/edit-comment/:id", editComment);
router.delete("/:id/delete-comment/:id", deleteComment);
router.put("/:id/color", updateColor);

module.exports = router;
