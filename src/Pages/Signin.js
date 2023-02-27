import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { Box } from "@mui/material";
// import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(dist/gif/login1.gif)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function loginUser(credentials) {
  return fetch('http://192.168.100.215:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Signin() {
  const classes = useStyles();
  const [user_email, setEmail] = useState();
  const [user_password, setPassword] = useState();
  // const { register, handleSubmit, errors } = useForm();
  // const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      user_email,
      user_password,
    });
    if ('access_token' in response) {
      swal({
        title: "Login Berhasil",
        text: "Selamat Datang",
        icon: "success",
        timer: 3000,
        button: false,
      })
      localStorage.setItem('access_token', response['access_token']);
      localStorage.setItem('dbo_user', JSON.stringify(response['dbo_user']));
      window.location.href = '/dashboard';

    }
    // if ('access_token' in response) {
    //   swal("Berhasil", response.message, "success", {
    //     buttons: false,
    //     timer: 2000,
    //   })
    //   .then((value) => {
    //     localStorage.setItem('access_token', response['access_token']);
    //     localStorage.setItem('dbo_user', JSON.stringify(response['dbo_user']));
    //     window.location.href = "/dashboard";
    //   });
    // } else {
    //   swal("Gagal", response.message, "error");
    // }
  }

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={process.env.PUBLIC_URL + '/dist/img/logobpd.png'} width={65} height={80} />
          <br />
          <Typography component="h2" variant="h4" color="primary">
            BPD DIY SMART
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="user_email"
                name="user_email"
                label="Masukkan Email"
                onChange={e => setEmail(e.target.value)}
                // {...register('user_email', { required: true, pattern: /\S+@\S+\.\S+/ })}
                // // {...register("user_email",
                //   {
                //     required: true,
                //     pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                //   })}
              />
              {/* {errors.user_email && <p>Please check the Email</p>} */}
              {/* <Box>
              {errors.user_email && errors.user_email.type === "required" && (
                <span className="error-message">This is required field</span>
              )}
              {errors.user_email && errors.user_email.type === "pattern" && (
                <span className="error-message">Enter a valid email</span>
              )}
            </Box> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user_password"
              name="user_password"
              label="Masukkan Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );

}

