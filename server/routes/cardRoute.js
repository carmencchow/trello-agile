const express = require('express');
const { getCard, getCards, createCard } = require('../controllers/cardController')

const router = express.Router();

// localhost:5000/api/card
router.get('/', getCards) 
router.get('/:id', getCard) 
router.post('/create', createCard)

// UPDATE, ARCHIVE, EDIT card

module.exports = router
