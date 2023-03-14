const express = require('express');

// import functions from listController
const { getList, createList, deleteList } = require('../controllers/listController')

const router = express.Router();

// ROUTES for board
router.get('/:id', getList) //>
router.post('/create', createList)
router.delete('/:boardId/:listId', deleteList)

module.exports = router
