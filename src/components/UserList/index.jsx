import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/UserService";

function UserList() {
  const [users, setUsers] = useState([]);

  const getListUser = async () => {
    const result = await getAllUsers();
    if (result) {
      setUsers(result);
    }
  }

  useEffect(() => {
    getListUser();
  }, []);

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
              <ListItemText primary={`${item.last_name}`} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default UserList;
