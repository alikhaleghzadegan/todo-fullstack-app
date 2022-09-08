import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Task from './Task';


export default function TasksList({ tasks, setTasks }) {

    const [hover, setHover] = React.useState(null);

    return (
        <div>
            {tasks && tasks.length ? tasks.map(
                (task) => {
                    return (
                        <Card
                            key={task._id}
                            raised={task._id === hover}
                            onMouseEnter={() => setHover(task._id)}
                            onMouseLeave={() => setHover(null)}
                            style={{ marginBottom: 7, marginTop: 7 }}
                        >
                            <CardContent>
                                <Task task={task} setTasks={setTasks} />
                            </CardContent>
                        </Card>
                    );
                }
            ) :
                <Typography style={{ marginTop: 25, textAlign: 'center' }}>
                    No tasks can be found!
                </Typography>
            }
        </div >
    );
}
