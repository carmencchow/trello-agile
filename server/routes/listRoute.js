const express = require('express');

// import functions from listController
const { getList, getLists, createList, deleteList, updateListName } = require('../controllers/listController')

const router = express.Router();

// ROUTES /api/list 
router.get('/', getLists) 
router.get('/:id', getList) 
router.post('/', createList)
router.delete('/:id', deleteList)
router.put('/:id', updateListName)

// router.delete('/:boardId/:listId', deleteList)
// router.get('/:boardId/:listid', getList) 
// router.post('/:boardId/:listId', createList)
// router.put('/:boardId/:listId', updateList)

module.exports = router
