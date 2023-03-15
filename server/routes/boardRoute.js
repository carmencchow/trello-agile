const express = require('express');

// import functions from boardController
const { getBoard, getBoards, createBoard, deleteBoard, editBoardName } = require('../controllers/boardController')

const router = express.Router();

// ROUTES '/api/board/'
router.get('/', getBoards) 
router.get('/:id', getBoard) 
router.post('/', createBoard)
router.delete('/:id', deleteBoard)
router.put('/:id', editBoardName)

// GET by :id
module.exports = router
