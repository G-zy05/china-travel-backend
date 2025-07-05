const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// 注册接口
router.post('/register', register);

// 登录接口
router.post('/login', login);

module.exports = router;