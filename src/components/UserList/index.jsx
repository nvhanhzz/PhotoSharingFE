import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUsers, getUserByJwt } from "../../services/UserService";
import { useSelector } from "react-redux";

function UserList() {
  const login = useSelector(state => state.login);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userJwt, setUserJwt] = useState(null);

  useEffect(() => {
    const getUserJwt = async () => {
      const result = await getUserByJwt();
      setUserJwt(result);
    }
    getUserJwt();
  }, [login]);

  useEffect(() => {
    const getListUser = async () => {
      const result = await getAllUsers();
      if (result.error) {
        navigate("/");
      } else {
        setUsers(result);
      }
    }
    getListUser();
  }, [login]);

  return (
    <div>
      <List component="nav">
        {users.map((item, index) => (
          <div key={index}>
            <ListItem
              key={item._id}
              button
              component={Link}
              to={`/users/${item._id}`}>
              <ListItemText primary={(userJwt && item._id === userJwt._id) ? `${item.first_name} ${item.last_name} (Me)` : `${item.first_name} ${item.last_name}`} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default UserList;
