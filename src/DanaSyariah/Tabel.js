import React, { useEffect, useRef, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import {ButtonGroup} from "@mui/material";
import {Link} from "react-router-dom";
import {Box} from "@mui/material";
import {Container} from "@mui/material";
import Title from '../Components/Title';

export default function BasicTable() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    UsersGet()
  }, [])

  const UsersGet = () => {
    fetch("https://www.mecallapi.com/api/users")
      .then(res => res.json())
      .then(
        (result) => {
          setUsers(result)
        }
      )
  }

  const UpdateUser = id => {
    window.location = '/update/' + id
  }

  const UserDelete = id => {
    var data = {
      'id': id
    }
    fetch('https://www.mecallapi.com/api/users/delete', {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(
        (result) => {
          alert(result['message'])
          if (result['status'] === 'ok') {
            UsersGet();
          }
        }
      )
  }

  return (
    <>
    <Container>
      <Paper>
        <Box>
          <Box>
            <Title>Users List</Title>
          </Box>
          <Box>
            <Link to="/create">
              <Button variant="contained" color="primary">
                Create
              </Button>
            </Link>
          </Box>
        </Box>
        <br />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="left">First</TableCell>
            <TableCell align="left">Last</TableCell>
            <TableCell align="left">Username</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{user.id}</TableCell>
              <TableCell align="left">{user.fname}</TableCell>
              <TableCell align="left">{user.lname}</TableCell>
              <TableCell align="left">{user.username}</TableCell>
              <TableCell align="center">
            
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button onClick={() => UpdateUser(user.id)}>Edit</Button>
                <Button onClick={() => UserDelete(user.id)}>Del</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
      </Container>
    </>
  );
}