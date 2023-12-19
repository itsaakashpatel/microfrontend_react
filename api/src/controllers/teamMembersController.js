const { validationResult } = require("express-validator");
const TeamMember = require("../models/TeamMember");

class TeamMembersController {
  async getAllTeamMembers(req, res) {
    try {
      const teamMembers = await TeamMember.find().sort({ lastUpdated: -1 });
      res.status(200).json({
        status: "success",
        data: teamMembers,
        code: 200,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async addTeamMember(req, res) {
    // Validation using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, phone, email, role } = req.body;

    try {
      const newTeamMember = new TeamMember({
        firstName,
        lastName,
        phone,
        email,
        role,
        lastUpdated: Date.now(),
      });
      await newTeamMember.save();
      res.status(201).json({
        status: "success",
        data: newTeamMember,
        code: 201,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async editTeamMember(req, res) {
    // Validation using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { firstName, lastName, phone, email, role } = req.body;

    try {
      const updatedTeamMember = await TeamMember.findByIdAndUpdate(
        id,
        { firstName, lastName, phone, email, role, lastUpdated: Date.now() },
        { new: true }
      );

      if (!updatedTeamMember) {
        return res
          .status(404)
          .json({ error: "Team member not found", code: 404, status: "fail" });
      }

      res.json({
        status: "success",
        data: updatedTeamMember,
        code: 200,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", code: 500, status: "fail" });
    }
  }

  async deleteTeamMember(req, res) {
    const { id } = req.params;

    try {
      const deletedTeamMember = await TeamMember.findByIdAndDelete(id);

      if (!deletedTeamMember) {
        return res
          .status(404)
          .json({ error: "Team member not found", code: 404, status: "fail" });
      }

      res.json({
        status: "success",
        data: deletedTeamMember,
        code: 200,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", code: 500, status: "fail" });
    }
  }
}

module.exports = new TeamMembersController();
