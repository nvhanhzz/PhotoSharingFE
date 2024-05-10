import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getUserByID } from "../../services/UserService";

function TopBar() {
  const location = useLocation();
  let context = "";
  const userId = location.pathname.split("/")[2];

  const [user, setUser] = useState(null);

  const getUser = async (id) => {
    const result = await getUserByID(id);

    if (result) {
      console.log(result[0]);
      setUser(result[0]);
    }

    return result;
  }

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  if (location.pathname.startsWith("/users")) {
    if (user) {
      context = `${user.last_name}`;
    }
  } else if (location.pathname.startsWith("/photos")) {
    if (user) {
      context = `Photos of ${user.last_name}`;
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Nguyễn Văn Hạnh
        </Typography>
        <Typography variant="h6">{context}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
