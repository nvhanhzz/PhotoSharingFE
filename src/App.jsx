import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import { getUserByJwt } from "./services/UserService";
import { useSelector } from 'react-redux';
import RegisterForm from "./components/Register";

const App = () => {
  const login = useSelector(state => state.login);
  const [userJwt, setUserJwt] = useState(null);

  useEffect(() => {
    const getUserJwt = async () => {
      try {
        // console.log(login);
        const result = await getUserByJwt();
        const json = await result.json();
        setUserJwt(json);
      } catch (error) {
        setUserJwt(null);
      }
    }
    getUserJwt();
  }, [login]);

  return (
    <>
      <Router>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar />
          </Grid>
          <div className="main-topbar-buffer" />

          {userJwt && userJwt._id ? (
            <>
              <Grid item sm={3}>
                <Paper className="main-grid-item">
                  <UserList />
                </Paper>
              </Grid>
              <Grid item sm={9}>
                <Paper className="main-grid-item">
                  <Routes>
                    <Route path="/users/:userId" element={<UserDetail />} />
                    <Route path="/photos/:userId" element={<UserPhotos />} />
                    <Route path="*" element={<Home />} />
                  </Routes>
                </Paper>
              </Grid>
            </>) : (
            <>
              <Routes>
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Login />} />
              </Routes>
            </>
          )}
        </Grid>
      </Router>
    </>
  );
};

export default App;
