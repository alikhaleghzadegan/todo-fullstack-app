import * as React from 'react';
import axios from 'axios';
import SearchProvider from '../context/SearchContext';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TasksList from './TasksList';
import AddTask from './AddTask';


export default function TasksContainer() {

    const [tasks, setTasks] = React.useState([]);

    React.useEffect(() => {
        axios.request({
            method: "GET",
            baseURL: 'http://localhost:5000',
            url: "/api/tasks",
            withCredentials: true,
            headers: {
                "Content-type": "application/json",
            }
        }).then(response => {
            setTasks(response.data)
        }).catch(error => console.error(error));
    }, []);


    return (
        <SearchProvider>
            <div>
                <Grid container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    className="task-container"
                >
                    <Grid item xs={12} sm={8} md={6}>
                        <Paper elevation={4} style={{ borderRadius: 16 }}>
                            <Grid container direction="column" style={{ padding: 16 }}>
                                <Grid item style={{ textAlign: "center", padding: 16 }}>
                                    <Typography variant="h4">Simple Task Manager App</Typography>
                                </Grid>
                                <Grid item style={{ paddingBottom: 16 }}>
                                    <Divider />
                                </Grid>
                                <Grid item>
                                    <AddTask setTasks={setTasks} />
                                </Grid>
                                <Grid item>
                                    <TasksList tasks={tasks} setTasks={setTasks} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </SearchProvider>
    )
}