const express = require('express');
const { getCard, getCards, createCard, updateMembers,  updateCardName, getMembersFromCard, deleteCard, deleteMembers } = require('../controllers/cardController')

const router = express.Router();

//localhost:5000/api/card
router.get('/', getCards) 
router.get('/:id', getCard) 
router.post('/', createCard)
router.delete('/:id', deleteCard)
router.put('/:id', updateCardName)
router.get('/members/:id', getMembersFromCard)
router.delete('/members/:id', deleteMembers)
router.put('/members/:id', updateMembers)

// ARCHIVE CARD????

module.exports = router
