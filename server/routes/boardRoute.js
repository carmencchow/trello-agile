const express = require('express');

// import functions from boardController
const { getBoard, getBoards, createBoard } = require('../controllers/boardController')

const router = express.Router();

// ROUTES '/api/board'
router.get('/', getBoards) 
router.get('/:id', getBoard) 
router.post('/create', createBoard)

// GET by :id

module.exports = router
