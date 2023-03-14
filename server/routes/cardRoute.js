const express = require('express');

// import functions from cardController
const { getCard, createCard } = require('../controllers/cardController')

const router = express.Router();

// ROUTES for card
router.get('/', getCard) //>
router.post('/create', createCard)

// UPDATE, ARCHIVE, EDIT card





module.exports = router
