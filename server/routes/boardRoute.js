const express = require('express');

// import functions from boardController
const { getBoard, createBoard } = require('../controllers/boardController')

const router = express.Router();

// ROUTES for board
router.get('/', getBoard) //>
router.post('/create', createBoard)

// GET by :id




module.exports = router
