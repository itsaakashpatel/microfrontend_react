const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../index");
const TeamMember = require("../../src/models/TeamMember");

const { expect } = chai;
chai.use(chaiHttp);

describe("Team Members Controller Test", () => {
  beforeEach(async () => {
    // Clear the TeamMember collection before each test
    await TeamMember.deleteMany();
  });

  describe("GET /api/team", () => {
    it("should return an empty array when no team members are present", async () => {
      const res = await chai.request(app).get("/api/team");
      expect(res).to.have.status(200);
      expect(res.body)
        .to.be.an("object")
        .that.has.property("data")
        .that.is.an("array").that.is.empty;
    });

    it("should return an array of team members when they exist", async () => {
      // Add some team members for testing
      await TeamMember.create([
        {
          firstName: "John",
          lastName: "Doe",
          phone: "1234567890",
          email: "john@example.com",
          role: "regular",
        },
        {
          firstName: "Jane",
          lastName: "Doe",
          phone: "9876543210",
          email: "jane@example.com",
          role: "admin",
        },
      ]);

      const res = await chai.request(app).get("/api/team");
      expect(res).to.have.status(200);
      expect(res.body)
        .to.be.an("object")
        .that.has.property("data")
        .that.is.an("array")
        .that.has.lengthOf(2);
    });
  });

  describe("POST /api/team", () => {
    it("should add a new regular team member", async () => {
      const newTeamMember = {
        firstName: "New",
        lastName: "Member",
        phone: "5551234567",
        email: "new@example.com",
        role: "regular",
      };

      const res = await chai.request(app).post("/api/team").send(newTeamMember);

      expect(res).to.have.status(201);
      expect(res.body)
        .to.be.an("object")
        .that.has.property("data")
        .that.includes(newTeamMember);

      // Check if the team member is actually added to the database
      const teamMembers = await TeamMember.find();
      expect(teamMembers).to.be.an("array").that.has.lengthOf(1);
      expect(teamMembers[0]).to.include(newTeamMember);
    });

    it("should return validation error if required fields are missing", async () => {
      const res = await chai.request(app).post("/api/team").send({});
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object").that.has.property("errors");
    });
  });

  describe("PUT /api/team/:id", () => {
    it("should update an existing team member", async () => {
      // Add a team member for testing
      const existingTeamMember = await TeamMember.create({
        firstName: "Existing",
        lastName: "Member",
        phone: "5551234567",
        email: "existing@example.com",
        role: "regular",
      });

      const updatedData = {
        firstName: "Updated",
        lastName: "Member",
        phone: "5557654321",
        email: "updated@example.com",
        role: "admin",
      };

      const res = await chai
        .request(app)
        .put(`/api/team/${existingTeamMember._id}`)
        .send(updatedData);

      expect(res).to.have.status(200);
      expect(res.body)
        .to.be.an("object")
        .that.has.property("data")
        .that.includes(updatedData);

      // Check if the team member is actually updated in the database
      const updatedTeamMember = await TeamMember.findById(
        existingTeamMember._id
      );
      expect(updatedTeamMember).to.include(updatedData);
    });

    it("should return validation error if required fields are missing", async () => {
      // Add a team member for testing
      const existingTeamMember = await TeamMember.create({
        firstName: "Existing",
        lastName: "Member",
        phone: "5551234567",
        email: "existing@example.com",
        role: "regular",
      });

      const res = await chai
        .request(app)
        .put(`/api/team/${existingTeamMember._id}`)
        .send({});
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object").that.has.property("errors");
    });
  });

  describe("DELETE /api/team/:id", () => {
    it("should delete an existing team member", async () => {
      // Add a team member for testing
      const existingTeamMember = await TeamMember.create({
        firstName: "Existing",
        lastName: "Member",
        phone: "5551234567",
        email: "existing@example.com",
        role: "regular",
      });

      const res = await chai
        .request(app)
        .delete(`/api/team/${existingTeamMember._id}`);

      expect(res).to.have.status(200);
      expect(res.body)
        .to.be.an("object")
        .that.has.property("status")
        .that.includes("success");

      // Check if the team member is actually deleted from the database
      const deletedTeamMember = await TeamMember.findById(
        existingTeamMember._id
      );
      expect(deletedTeamMember).to.be.null;
    });

    it("should return an error if the team member does not exist", async () => {
      const nonExistingTeamMemberId = "21312312312312";

      const res = await chai
        .request(app)
        .delete(`/api/team/${nonExistingTeamMemberId}`);

      expect(res).to.satisfy((response) => {
        return response.status === 404 || response.status === 500;
      });

      expect(res.body)
        .to.be.an("object")
        .that.has.property("status")
        .that.includes("fail");
    });
  });
});
