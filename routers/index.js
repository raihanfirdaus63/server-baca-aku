const express = require('express');
const Controller = require('../controllers');
const authentication = require('../middlewares/authentication');
const router = express.Router();

router.get('/', Controller.test)
router.post('/login-user', Controller.loginUser)
router.post('/login-admin', Controller.loginAdmin)
router.post('/register-user', Controller.registerUser)

// router.use(authentication)
router.post('/register-admin', Controller.registerAdmin)
router.post('/user-personality', Controller.getUserPersonality)
router.post('/findPersonality', Controller.findPersonality)

module.exports = router;