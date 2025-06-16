// addPasswords.js
const Member = require("./models/Member"); // your Member model
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://yeswanth:yeswanth@cluster0.3whyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function addPasswordsToExistingMembers(defaultPassword = "tempPass@123") {
  try {
    // Hash password first
    const hashed = await bcrypt.hash(defaultPassword, 10);

    // Update all members without password
    await Member.updateMany(
      { password: { $exists: false } },
      { $set: { password: hashed } }
    );

    console.log("Passwords successfully updated.");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
}

async function connectAndAddPasswords() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    await addPasswordsToExistingMembers();
  } catch (error) {
    console.error(error);
  }
}

connectAndAddPasswords();
