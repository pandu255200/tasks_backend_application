const Member = require('../models/Member');

// Create a new Member
exports.createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all members
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find().populate('mentor');
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get members by mentor
exports.getMembersByMentor = async (req, res) => {
  const { mentorId } = req.params;
  try {
    const members = await Member.find({ mentor: mentorId }).populate('mentor');
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch members for mentor' });
  }
};


// Mark attendance with leave option
exports.markAttendance = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { date, present, leaveReason } = req.body;

    const member = await Member.findById(memberId);
    if (!member) return res.status(404).json({ error: 'Member not found' });

    // Optional: prevent duplicate attendance on the same date
    const alreadyMarked = member.attendance.find(entry =>
      new Date(entry.date).toDateString() === new Date(date).toDateString()
    );

    if (alreadyMarked) {
      return res.status(400).json({ error: 'Attendance already marked for this date' });
    }

    member.attendance.push({ 
      date, 
      present, 
      leaveReason: leaveReason ? leaveReason : '' 
    });
    await member.save();

    res.status(200).json({ message: 'Attendance recorded successfully!', attendance: member.attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get attendance history for a member
exports.getAttendance = async (req, res) => {
  try {
    const { memberId } = req.params;
    const member = await Member.findById(memberId);

    if (!member) return res.status(404).json({ error: 'Member not found' });

    res.status(200).json({ attendance: member.attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAllMembersToIntern = async (req, res) => {
  try {
    await Member.updateMany({}, { $set: { role: "intern" } });

    res.status(200).json({ message: "All members updated to role: intern" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};