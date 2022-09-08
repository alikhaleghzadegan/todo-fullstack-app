import * as React from 'react';
import { SearchContext } from '../context/SearchContext';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import moment from 'moment';
import axios from 'axios';


export default function Task({ task, setTasks }) {

    const { setIsSearching } = React.useContext(SearchContext);

    const handleDeleteTask = () => {
        axios.request({
            method: "DELETE",
            baseURL: 'http://localhost:5000',
            url: "/api/tasks/" + task._id,
            withCredentials: true,
            headers: {
                "Content-type": "application/json",
            }
        }).then(response => {
            setTasks(response.data);
            setIsSearching(false);
        }).catch(err => console.error(err));
    }

    const handleEditTask = () => {
        const newText = prompt("Please edit the task: ", task.text);
        if (newText) {
            axios.request({
                method: "PUT",
                baseURL: 'http://localhost:5000',
                url: "/api/tasks/" + task._id,
                withCredentials: true,
                headers: {
                    "Content-type": "application/json",
                },
                data: {
                    "text": newText
                }
            }).then(response => {
                setTasks(response.data);
                setIsSearching(false);
            }).catch(err => console.error(err));
        }
    }

    const handleCompleteTask = () => {
        const newStatus = task.status === "finished" ? "not_finished" : "finished";
        axios.request({
            method: "PUT",
            baseURL: 'http://localhost:5000',
            url: "/api/tasks/" + task._id,
            withCredentials: true,
            headers: {
                "Content-type": "application/json",
            },
            data: {
                "status": newStatus
            }
        }).then(response => {
            setTasks(response.data);
            setIsSearching(false);
        }).catch(error => console.error(error));

    }

    return (
        <div>
            {
                task.status === "finished" ?
                    <Typography gutterBottom style={{ textDecoration: "line-through" }}>
                        {task.text}
                    </Typography>
                    :
                    <Typography gutterBottom>{task.text}</Typography>
            }

            <Typography gutterBottom color="text.secondary" sx={{ fontSize: 14 }}>
                created: {moment(task.creationDate).fromNow()}
            </Typography>

            <Tooltip title="delete the task">
                <IconButton color="error" onClick={handleDeleteTask}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="edit the task">
                <IconButton color="info" onClick={handleEditTask}>
                    <EditIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="mark or unmark the task">
                <IconButton color="success" onClick={handleCompleteTask} >
                    <TaskAltIcon />
                </IconButton>
            </Tooltip>
        </div >
    );
}