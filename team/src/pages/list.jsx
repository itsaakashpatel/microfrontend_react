import React, { useEffect, useState } from "react";
import Header from "shared/Header";
import Member from "../components/member";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

function ListTeam() {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    navigate("/add");
  };

  useEffect(() => {
    fetch("http://localhost:8085/api/team")
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
    <div className="mt-10 text-xl max-w-xl container mx-auto bg-gray-100 p-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded inline-flex items-center float-right"
        onClick={handleClick}
      >
        <PlusCircleIcon className="h-5 w-5" />
      </button>
      <Header
        title="Team members"
        subtitle={`You have ${teamMembers.length} team members.`}
      />
      {isLoading ? (
        <p>Loading...</p>
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
