const express = require('express');
const router = express.Router();
const { createMentor, getMentors, loginMentor, deleteMentor } = require('../controllers/mentorController');

// Create a new mentor
router.post('/', createMentor);

// Get all mentors
router.get('/', getMentors);

// Mentor login
router.post('/login', loginMentor);  // <-- added login route
router.delete('/delete/:id', deleteMentor);  // <-- added login route

module.exports = router;
