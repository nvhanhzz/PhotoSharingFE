import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getUserByID, getUserByJwt } from "../../services/UserService";
import { useDispatch, useSelector } from 'react-redux';
import "./styles.css";
import { postLogout } from "../../services/AuthServices";
import { logout } from "../../actions/Login";

function TopBar() {
  const dispatch = useDispatch();
  const [userJwt, setUserJwt] = useState("Please login !");
  const [user, setUser] = useState();

  const location = useLocation();
  let context = "";
  const userId = location.pathname.split("/")[2];

  const login = useSelector(state => state.login);
  useEffect(() => {
    const getUser = async (id) => {
      const result = await getUserByID(id);
      setUser(result);
    }
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    const getUserJwt = async () => {
      const result = await getUserByJwt();
      if (result.first_name) {
        setUserJwt(`Hi ${result.first_name} !`);
      } else {
        setUserJwt(`Please login !`);
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

  const handleLogout = () => {
    const Logout = async () => {
      const result = await postLogout();
      dispatch(logout());
    }
    Logout();
  };

  return (
    <AppBar position="static">
      <Toolbar className="toolbar">
        <Typography variant="h6" >
          {userJwt}
        </Typography>
        <Typography variant="h6">
          {/* {context !== "undefined undefined" ? context : ""} */}
          {context}
        </Typography>
        {(userJwt !== "Please login !") ?
          <Button color="inherit" onClick={handleLogout}>Log out</Button>
          : <></>
        }
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
