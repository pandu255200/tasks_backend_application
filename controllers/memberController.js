const Member = require('../models/Member');

exports.createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMembers = async (req, res) => {
  const members = await Member.find().populate('mentor');
  res.json(members);
};


exports.getMembersByMentor = async (req, res) => {
  const { mentorId } = req.params;
  try {
    const members = await Member.find({ mentor: mentorId }).populate('mentor');
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch members for mentor' });
  }
};