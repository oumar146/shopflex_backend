const express = require('express');
const router = express.Router();
const { signup, login, test } = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const client = require('../dataBase');

//Routes
router.post('/signup', (req, res) => signup(req, res, client));
router.post('/login', (req, res) => login(req, res, client));
//Verifier si le token est valide
router.post('/test', auth, (req, res) => test(req, res, client));

module.exports = router;
