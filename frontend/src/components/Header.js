import * as React from 'react';
import * as Router from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from "../assets/logo.png";


export default function Header(props) {

  const { user, setUser } = React.useContext(AuthContext);
  const navigate = Router.useNavigate();

  const handleClickLogout = () => {
    axios.request({
      method: "GET",
      baseURL: 'http://localhost:5000',
      url: "/auth/logout",
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      }
    }).then(response => {
      setUser(null);
      navigate("/auth/login");
    }).catch(err => console.error(err));
  }

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item md={3} >
              <img
                src={logo}
                alt="GOTO Logo"
                style={{ cursor: "pointer", height: 45, marginTop: 10 }}
                onClick={() => window.open("https://www.goto.com/")}
              />
            </Grid>
            <Grid item md >
              <Router.Link to="/" style={{ textDecoration: 'none', color: "white" }}>
                <Typography sx={{ textAlign: 'center', marginTop: 2 }} variant="h6">
                  GOTO Coding Challenge
                </Typography>
              </Router.Link>
            </Grid>
            <Grid item md={3} >
              {user &&
                <div>
                  <Typography sx={{ textAlign: 'right', margin: 1, fontSize: 16 }}>
                    <span>Welcome, {user.name}</span> <br />
                    <Router.Link to="/auth/login"
                      style={{ textDecoration: 'none', color: "white" }}
                      onClick={handleClickLogout}
                    >
                      Logout
                    </Router.Link>
                  </Typography>
                </div>
              }

              {!user &&
                <div>
                  <Typography sx={{ textAlign: 'right', margin: 1, fontSize: 16 }}>
                    <Router.Link to="/auth/login"
                      style={{ textDecoration: 'none', color: "white" }}
                    >
                      Login
                    </Router.Link> <br />
                    <Router.Link to="/auth/signup"
                      style={{ textDecoration: 'none', color: "white" }}
                    >
                      Signup
                    </Router.Link>
                  </Typography>
                </div>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container style={{ height: "15vh" }} />
    </div>
  );
};
