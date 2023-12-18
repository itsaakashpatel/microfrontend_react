const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: {
    type: String,
    unique: true,
  },
  role: String,
});

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

module.exports = TeamMember;
