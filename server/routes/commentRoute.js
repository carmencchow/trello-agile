const express = require("express");
const auth = require("../middleware/auth");

const {
  addComment,
  editComment,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();


//localhost:5000/api/card/:id/comment

// router.post("/:id/add-comment", auth, addComment);
// router.put("/:id/edit-comment/:id", auth, editComment);
// router.delete("/:id/delete-comment/:id", auth, deleteComment);

router.post("/:id/comment", addComment);
router.put("/:id/comment/:id", editComment);
router.delete("/:id/delete/:id", deleteComment);

module.exports = router;
