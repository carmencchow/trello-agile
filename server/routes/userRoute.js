const express = require('express');
const { login, logout, register } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router;