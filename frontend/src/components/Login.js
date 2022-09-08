import * as React from 'react';
import * as Router from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function Login() {

    const { setUser } = React.useContext(AuthContext);
    const navigate = Router.useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        axios.request({
            method: "POST",
            baseURL: 'http://localhost:5000',
            url: "/auth/login",
            data: {
                "email": email,
                "password": password
            },
            withCredentials: true,
            headers: {
                "Content-type": "application/json",
            }
        }).then(response => {
            navigate("/");
            setUser(response.data);
        }).catch(err => {
            console.error(err);
            document.getElementById('error').innerHTML = err.response.data;
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmitForm}>
                <Grid container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    className="task-container"
                >
                    <Grid item xs={12} sm={8} md={6}>
                        <Paper elevation={4} style={{ borderRadius: 16 }}>
                            <Grid container direction="column" style={{ padding: 16 }} spacing={1}>
                                <Grid item style={{ textAlign: "center" }}>
                                    <Typography variant="h4">Login</Typography>
                                </Grid>
                                <Grid item>
                                    <Divider />
                                </Grid>
                                <Grid item>
                                    <TextField fullWidth placeholder="E-Mail Address" size="small" name="email" type="email" onChange={handleChangeEmail} />
                                </Grid>
                                <Grid item>
                                    <TextField fullWidth placeholder="password" size="small" name="password" type="password" onChange={handleChangePassword} />
                                </Grid>
                                <Grid item>
                                    <div id='error' style={{ color: "red" }}></div>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" type='submit'>Submit</Button>
                                </Grid>
                                <Grid item>
                                    <Typography>Are you a new User? &nbsp;
                                        <Router.Link to="/auth/signup">Signup</Router.Link> Now!
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </div>

    );
}
