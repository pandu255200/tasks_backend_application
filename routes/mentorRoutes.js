const express = require('express');
const router = express.Router();
const { createMentor, getMentors } = require('../controllers/mentorController');

router.post('/', createMentor);
router.get('/', getMentors);

module.exports = router;
