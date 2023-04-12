const express = require("express");
const router = express.Router();
const {CreateUser, CheckUser}= require('../controllers/user')

router.post("/signup", CreateUser);
router.post("/login", CheckUser);



module.exports = router;