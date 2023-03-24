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

// router.delete('/:boardId/:listId', deleteList)
// router.get('/:boardId/:listid', getList)
// router.post('/:boardId/:listId', createList)
// router.put('/:boardId/:listId', updateList)

module.exports = router;
