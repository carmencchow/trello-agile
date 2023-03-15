const express = require('express');
const { getCard, getCards, createCard, updateMembers,  updateCardName } = require('../controllers/cardController')

const router = express.Router();

// localhost:5000/api/card
router.get('/', getCards) 
router.get('/:id', getCard) 
router.post('/', createCard)
router.put('/:id', updateCardName)
router.put('/:id', updateMembers)

// ARCHIVE CARD????


module.exports = router
