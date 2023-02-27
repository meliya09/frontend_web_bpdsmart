import React, { useEffect, useRef, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ModeIcon from '@mui/icons-material/Mode';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import LokasiATMCreate from "./LokasiATMCreate";


const dbo_user = JSON.parse(localStorage.getItem("dbo_user"));

const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

export default function LokasiATMList() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [dbo_lokasi, setAtm] = useState([]);
  const [create, setOpenCreate] = React.useState(false);

  const handleClickCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };


  useEffect(() => {
    getAtm();
  }, []);

  const getAtm = async () => {
    const dbo_lokasi = await axios.get('http://192.168.100.215:8080/lokasiatm');
    setAtm(dbo_lokasi.data);

  }
  const getDetailATM = (id) => {
    navigate(`/lokasiatm/detaillokasiatm/${id}`);
  };

  const UpdateLokasiATM = async (id) => {
    navigate(`/updatelokasiatm/${id}`);
  };

  const LokasiATMDelete = async (id) => {
    await axios.delete(`http://192.168.100.215:8080/lokasiatm/${id}`);
    getAtm();
  };

  return (
    // View produk konven admin
    <>
      {(() => {
        if (dbo_user.user_admin === "1") {
          return (
            <Container>
              <Paper>
                <Box>
                  <Box
                    m={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItem="flex-end"
                    className={classes.box}
                  >

                    <Button startIcon={<AddIcon />} onClick={handleClickCreate} variant="contained" color="primary" sx={{ height: 40 }} >
                      Create
                    </Button>
                    <LokasiATMCreate create={create} handleCloseCreate={handleCloseCreate} />

                  </Box>

                </Box>
                <br />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">No</TableCell>
                        <TableCell align="left">Nama Menu</TableCell>
                        <TableCell align="left">Tipe</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="center">Aksi</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dbo_lokasi.map((atm, index) => (
                        <TableRow
                          key={atm.lokasi_id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="right">{index + 1}</TableCell>
                          <TableCell align="left">{atm.lokasi_nama}</TableCell>
                          <TableCell align="left"><ModeIcon color="primary" sx={{ fontSize: 18 }} />{atm.kategori_nama}</TableCell>
                          <TableCell align="left">{atm.konten_status}</TableCell>
                          <TableCell align="center">
                            <ButtonGroup color="primary" aria-label="outlined primary button group">

                              <Button startIcon={<EditIcon />} color="success" onClick={() => UpdateLokasiATM(atm.lokasi_id)} >
                              </Button>

                              <Button startIcon={<DeleteIcon />} color="error"
                                onClick={() =>
                                  swal({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                  }).then((result) => {
                                    if (result) {
                                      LokasiATMDelete(atm.lokasi_id);
                                      swal({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success",
                                        buttons: "Ok",
                                      });
                                    }
                                  })

                                }
                              ></Button>

                            </ButtonGroup>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Container>
          )
        }
        if (dbo_user.user_admin === "2") {
          return (
            <Container>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">No</TableCell>
                    <TableCell align="left">Nama Menu</TableCell>
                    <TableCell align="left">Tipe</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="center">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dbo_lokasi.map((atm, index) => (
                    <TableRow
                      key={atm.lokasi_id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{index + 1}</TableCell>
                      <TableCell align="left">{atm.lokasi_nama}</TableCell>
                      <TableCell align="left"><ModeIcon color="primary" sx={{ fontSize: 18 }} />{atm.kategori_nama}</TableCell>
                      <TableCell align="left">{atm.konten_status}</TableCell>
                      <TableCell align="center">
                        {/* <ButtonGroup color="primary" aria-label="outlined primary button group"> */}
                        <Button startIcon={<InfoIcon />} variant="outlined" size="small" onClick={() => getDetailATM(atm.lokasi_id)}>Detail</Button>
                        {" "}
                          {/* <Button startIcon={<EditIcon />} color="success" onClick={() => UpdateLokasiATM(atm.lokasi_id)} >
                              </Button> */}
                          <Button startIcon={<DeleteIcon />}  variant="outlined" color="error"
                            onClick={() =>
                              swal({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              }).then((result) => {
                                if (result) {
                                  LokasiATMDelete(atm.lokasi_id);
                                  swal({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success",
                                    buttons: "Ok",
                                  });
                                }
                              })

                            }
                          ></Button>
                        {/* </ButtonGroup> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Container>
  )
}
if (dbo_user.user_admin === "3") {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">No</TableCell>
            <TableCell align="left">Nama Menu</TableCell>
            <TableCell align="left">Tipe</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="center">Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dbo_lokasi.map((atm, index) => (
            <TableRow
              key={atm.lokasi_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{index + 1}</TableCell>
              <TableCell align="left">{atm.lokasi_nama}</TableCell>
              <TableCell align="left"><ModeIcon color="primary" sx={{ fontSize: 18 }} />{atm.kategori_nama}</TableCell>
              <TableCell align="left">{atm.konten_status}</TableCell>
              <TableCell align="center">
                <Button startIcon={<InfoIcon />} variant="outlined" size="small" onClick={() => getDetailATM(atm.lokasi_id)}>Detail</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
      }) ()}


    </>
  );
}