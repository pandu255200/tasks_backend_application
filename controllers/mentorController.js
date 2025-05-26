const Mentor = require('../models/Mentor');

exports.createMentor = async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.status(201).json(mentor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMentors = async (req, res) => {
  const mentors = await Mentor.find();
  res.json(mentors);
};
