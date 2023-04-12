const express = require("express");
const router = express.Router();
const { UpdateUser} = require('../controllers/user')
const {authenticateToken} = require('../controllers/token');
const {createArticle, getAllArticle}  = require('../controllers/article');

router.post('/users/:userId/articles',authenticateToken, createArticle);
router.put("/users/:userId",authenticateToken, UpdateUser);
router.get('/articles',authenticateToken, getAllArticle);


module.exports = router;