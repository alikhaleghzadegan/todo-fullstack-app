
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import oops from "../assets/oops.png";


export default function NotFound() {

    return (
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
                            <Grid item style={{ textAlign: "center", padding: 16 }} >
                                <img src={oops} style={{ height: "128px" }} alt="oops!" />
                            </Grid>
                            <Grid item style={{ textAlign: "center", padding: 16 }}>
                                <Typography variant="h1">404</Typography>
                                <Typography variant="h5">Page Not Found!</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}