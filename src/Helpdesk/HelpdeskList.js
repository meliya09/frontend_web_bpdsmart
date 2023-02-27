import { makeStyles } from "@material-ui/core/styles";
import { Box, Container } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


const useStyles = makeStyles((theme) => ({
  box: {
    height: 20,
    padding: 8
  }
}));

export default function HelpdeskList() {
  const classes = useStyles();
  const [dbo_user, setHelpdesk] = useState([]);

  useEffect(() => {
    getHelpdesk();
  }, []);

  const getHelpdesk = async () => {
    const dbo_user = await axios.get('http://192.168.100.215:8080/datausers');
    setHelpdesk(dbo_user.data);

  }

  return (
    <>
      <Container>
        <Paper>
          <Box>
            <Box
              m={1}
              display="flex"
              justifyContent="flex-start"
              alignItem="flex-start"
              className={classes.box}
            >
              <Typography gutterBottom style={{ fontWeight: 'bold', color: 'indigo', fontSize: 18 }}>
              Admin Aplikasi BPD DIY SMART
              </Typography>
            </Box>
          </Box>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">No</TableCell>
                  <TableCell align="left">Nama</TableCell>
                  <TableCell align="left">Jabatan</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">No Telp</TableCell>
                  <TableCell align="left">Divisi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dbo_user.map((helpdesk, index) => (
                  <TableRow
                    key={helpdesk.staf_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="left">{helpdesk.user_nama}</TableCell>
                    <TableCell align="left">{helpdesk.user_jabatan}</TableCell>
                    <TableCell align="left">{helpdesk.user_email}</TableCell>
                    <TableCell align="left">{helpdesk.user_telp}</TableCell>
                    <TableCell align="left">{helpdesk.level_nama}</TableCell>
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