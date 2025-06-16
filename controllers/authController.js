const Member = require("../models/Member");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// ✅ Register a new member
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if a member with this email already exists
    const existing = await Member.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    // Hash password before saving
    const hashed = await bcrypt.hash(password, 10);

    // Create a new Member with hashed password and role
    const member = new Member({ 
      name, 
      email, 
      password: hashed, 
      role: role ? role : "intern" // fallback to 'intern'
    });

    await member.save();

    res.status(201).json({ message: "Member registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Login member
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the member exists
    const member = await Member.findOne({ email });
    if (!member) return res.status(404).json({ error: "Invalid email or password" });

    // Validate password
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // Generate JWT
    const token = jwt.sign({ id: member._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ 
      message: "Login successful",
      token,
      member: {
        id: member._id,
        name: member.name,
        email: member.email,
        role: member.role // NEW
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

