const express = require("express");
const { check } = require("express-validator");
const teamMembersController = require("../controllers/teamMembersController");

const router = express.Router();

router.get("/team", teamMembersController.getAllTeamMembers);

router.post(
  "/team",
  [
    check("firstName").notEmpty().withMessage("First Name is required"),
    check("lastName").notEmpty().withMessage("Last Name is required"),
    check("phone")
      .matches(/^\d{10}$/)
      .withMessage(
        "Phone number must be 10 digits without spaces or special characters"
      ),
    check("email").isEmail().withMessage("Invalid Email"),
    check("role")
      .notEmpty()
      .isIn(["admin", "regular"])
      .withMessage("Invalid Role"),
  ],
  teamMembersController.addTeamMember
);

router.put(
  "/team/:id",
  [
    check("firstName").notEmpty().withMessage("First Name is required"),
    check("lastName").notEmpty().withMessage("Last Name is required"),
    check("phone")
      .matches(/^\d{10}$/)
      .withMessage(
        "Phone number must be 10 digits without spaces or special characters"
      ),
    check("email").isEmail().withMessage("Invalid Email"),
    check("role")
      .notEmpty()
      .isIn(["admin", "regular"])
      .withMessage("Invalid Role"),
  ],
  teamMembersController.editTeamMember
);

module.exports = router;
