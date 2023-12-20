import React, { useEffect, useState } from "react";
import Header from "shared/Header";
import Member from "../components/member";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

function ListTeam() {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    navigate("/add");
  };

  useEffect(() => {
    fetch(`${process.env.API_ENDPOINT}/api/team`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.code === 200) {
          setTeamMembers(data.data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="mt-10 text-xl max-w-xl container mx-auto bg-gray-100 p-4 max-h-screen overflow-y-auto mb-12">
      <div className="flex float-right m-3">
        <PlusIcon
          className="h-6 w-6 text-blue-600  hover:bg-white-700 cursor-pointer "
          onClick={handleClick}
        />
      </div>
      <Header
        title="Team members"
        subtitle={`You have ${teamMembers.length} team members.`}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : teamMembers.length === 0 ? (
        <p>No members available in this team.</p>
      ) : (
        teamMembers.map((member) => (
          <Link to="/edit" state={{ member }} key={member._id}>
            <Member
              name={`${member.firstName} ${member.lastName}`}
              email={member.email}
              phone={member.phone}
              role={member.role}
            />
          </Link>
        ))
      )}
    </div>
  );
}

export default ListTeam;
