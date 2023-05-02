const express = require("express");
const auth = require("../middleware/auth");

// import functions from listController
const {
  getList,
  getLists,
  createList,
  deleteList,
  updateListName,
} = require("../controllers/listController");

const router = express.Router();

// ROUTES /api/list
router.get("/", auth, getLists);
router.get("/:id", auth, getList);
router.post("/", auth, createList);
router.delete("/:id", auth, deleteList);
router.put("/:id", auth, updateListName);

module.exports = router;
