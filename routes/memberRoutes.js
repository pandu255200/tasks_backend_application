const express = require('express');
const router = express.Router();
const {
  createMember,
  getMembers,
  getMembersByMentor
} = require('../controllers/memberController');

router.post('/', createMember);
router.get('/', getMembers);
router.get('/mentor/:mentorId', getMembersByMentor); // New route

module.exports = router;
