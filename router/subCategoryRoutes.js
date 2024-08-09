const express = require('express');
const router = express.Router();
const { newSubCategory, deleteSubCategory, getAllSubCategory } = require('../controllers/subCategoryCtrl');
const auth = require('../middleware/auth');
const client = require('../dataBase');

//Routes
router.post('/new', auth, (req, res) => newSubCategory(req, res, client));
router.delete('/delete', auth, (req, res) => deleteSubCategory(req, res, client));
router.get('/get', auth, (req, res) => getAllSubCategory(req, res, client));

module.exports = router;
