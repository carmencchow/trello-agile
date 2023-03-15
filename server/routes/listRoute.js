const express = require('express');

// import functions from listController
const { getList, getLists, createList, deleteList, updateListName } = require('../controllers/listController')

const router = express.Router();

// ROUTES /api/list 
router.get('/', getLists) 
// router.get('/:id', getList) 
router.get('/:boardId/:listid', getList) 
router.post('/', createList)
// router.post('/:boardId/:listId', createList)
router.delete('/:boardId/:listId', deleteList)
// router.put('/:boardId/:listId', updateList)
router.put('/', updateListName)

module.exports = router
