

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth'); 

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post("/update-password", authController.updatePassword);
router.get('/me', authMiddleware, (req, res) => {
  const { _id, name, email, role, dateOfJoining } = req.member;
  res.json({ id: _id, name, email, role, dateOfJoining });
});

module.exports = router;

