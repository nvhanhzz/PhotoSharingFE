import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getUserByID, getUserByJwt } from "../../services/UserService";
import { useSelector } from 'react-redux';
import "./styles.css";
import Logout from "../Logout";
import PhotoUploader from "../PhotoUploader";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const [userJwt, setUserJwt] = useState("Please login !");
  const [user, setUser] = useState();

  const location = useLocation();
  let context = "";
  const userId = location.pathname.split("/")[2];

  const login = useSelector(state => state.login);
  useEffect(() => {
    const getUser = async (id) => {
      const result = await getUserByID(id);
      const json = await result.json();
      // console.log(json);
      if (result.status === 200) {
        setUser(json);
      } else {
        console.error(result.status);
      }
    }
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    const getUserJwt = async () => {
      const result = await getUserByJwt();
      const json = await result.json();
      if (result.status === 200) {
        if (json._id) {
          setUserJwt(`Hi ${json.first_name} !`);
        } else {
          setUserJwt("Please login !");
        }
      }
    }
    getUserJwt();
  }, [login]);

  if (location.pathname.startsWith("/users")) {
    if (user) {
      context = `${user.first_name} ${user.last_name}`;
    }
  } else if (location.pathname.startsWith("/photos")) {
    if (user) {
      context = `Photos of ${user.first_name} ${user.last_name}`;
    }
  }

  const handleNavigate = () => {
    navigate("/");
  }

  return (
    <AppBar position="static">
      <Toolbar className="toolbar">
        <Typography variant="h6" >
          <Button color="inherit" onClick={handleNavigate}>{userJwt}</Button>
        </Typography>
        <Typography variant="h6">
          {/* {context !== "undefined undefined" ? context : ""} */}
          {context}
        </Typography>
        {(userJwt !== "Please login !") ?
          <>
            <PhotoUploader />
            <Logout />
          </>
          : <></>
        }
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
