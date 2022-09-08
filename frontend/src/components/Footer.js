import * as React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function Footer() {

  return (
    <div style={{ backgroundColor: "rgba(250, 250, 250, 0.8)" }} >
      <Divider />
      <Grid container style={{ padding: 32 }} justifyContent="center">
        <Grid item md={2} />
        <Grid item xs={6} md style={{ paddingBottom: 32 }}>
          <Typography variant="h6" gutterBottom color="text.secondary">
            About Me
          </Typography>
          <Grid item>
            <Typography gutterBottom>
              Ali Khaleghzadegan
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} md style={{ paddingBottom: 32 }}>
          <Typography variant="h6" gutterBottom color="text.secondary">
            Follow Me
          </Typography>
          <Grid container>
            <IconButton
              style={{ backgroundColor: "#000", color: "#fff" }}
              onClick={() => window.open("https://github.com/alikhaleghzadegan")}
            >
              <GitHubIcon />
            </IconButton>
            &nbsp;
            <IconButton
              style={{ backgroundColor: "#000", color: "#fff" }}
              onClick={() => window.open("https://www.linkedin.com/in/ali-khaleghzadegan/")}
            >
              <LinkedInIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12} md style={{ paddingBottom: 32 }}>
          <Typography variant="h6" gutterBottom color="text.secondary">
            Contact Me
          </Typography>
          <Typography>
            <Link href="mailto:khaleghzadegan1989@gmail.com" color="black" underline="none">
              khaleghzadegan1989@gmail.com
            </Link>
          </Typography>
        </Grid>
        <Grid item md={1} />
      </Grid>
    </div>
  );
};
