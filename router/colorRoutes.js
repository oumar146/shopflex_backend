const express = require('express');
const router = express.Router();
const { newColor, deleteColor, getAllColors } = require('../controllers/colorCtrl');
const auth = require('../middleware/auth');
const client = require('../dataBase');

//Routes
router.post('/new', auth, (req, res) => newColor(req, res, client));
router.post('/delete', auth, (req, res) => deleteColor(req, res, client));
router.post('/get', auth, (req, res) => getAllColors(req, res, client));

module.exports = router;
