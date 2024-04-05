import React, { useState, useEffect } from "react";
import axios from 'axios'; // นำเข้า Axios
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'; 
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserUpdate() {
  const classes = useStyles();
  const { id: userId } = useParams(); // ดึงค่า id จาก URL
  const [id] = useState(userId); // เริ่มต้น id ด้วยค่า userId

  useEffect(() => {
    axios.get("http://68.183.230.164:3000/users/list") // ใช้ Axios ในการดึงข้อมูลผู้ใช้
      .then(response => {
        const result = response.data;
        setFname(result.user.fname);
        setLname(result.user.lname);
        setUsername(result.user.username);
        setEmail(result.user.email);
        setAvatar(result.user.avatar);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]); // เรียก useEffect เมื่อ userId เปลี่ยนแปลง

  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      'id': id,
      'fname': fname,
      'lname': lname,
      'username': username,
      'email': email,
      'avatar': avatar,
    }
    axios.put('https://www.melivecode.com/api/users/update', data) // ใช้ Axios ในการส่งข้อมูลผู้ใช้ที่ถูกแก้ไข
    .then(response => {
      const result = response.data;
      alert(result['message'])
      if (result['status'] === 'ok') {
        window.location.href = '/';
      }
    })
    .catch(error => console.error('Error updating user:', error));
  }

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="avatar"
                label="Avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
}
