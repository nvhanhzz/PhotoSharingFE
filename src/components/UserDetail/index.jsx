import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getUserByID } from "../../services/UserService";

function UserDetail() {
  const uid = useParams().userId;

  const [user, setUser] = useState(null); // Thay đổi từ mảng rỗng sang null

  const getUser = async (id) => {
    const result = await getUserByID(id);

    if (result) {
      console.log(result[0]);
      setUser(result[0]);
    }

    return result;
  }

  useEffect(() => {
    getUser(uid);
  }, [uid]);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <>
      <h2>Name: {`${user.last_name}`}</h2>
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
