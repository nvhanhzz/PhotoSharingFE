import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getUserByID } from "../../services/UserService";

function UserDetail() {
  const uid = useParams().userId;

  const [user, setUser] = useState(null);

  const getUser = async (id) => {
    const result = await getUserByID(id);
    const json = await result.json();
    if (result.status === 200) {
      setUser(json);
    } else {
      console.error(result.status);
    }
  }

  useEffect(() => {
    getUser(uid);
  }, [uid]);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <>
      <h2>Name: {`${user.first_name} ${user.last_name}`}</h2>
      <p>Location: {user.location}</p>
      <p>Description: {user.description}</p>
      <p>Occupation: {user.occupation}</p>
      <Button component={Link} to={`/photos/${user._id}`}>
        View Photos
      </Button>
    </>
  );
}

export default UserDetail;
