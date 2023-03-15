const express = require('express');

// import functions from listController
const { getList, getLists, createList, deleteList } = require('../controllers/listController')

const router = express.Router();

// ROUTES /api/list 
router.get('/', getLists) 
router.get('/:id', getList) 
router.post('/create', createList)
router.delete('/:boardId/:listId', deleteList)

module.exports = router
