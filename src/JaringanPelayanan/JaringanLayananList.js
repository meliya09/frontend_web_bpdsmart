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
// import { AgGridReact } from 'ag-grid-react';
// import { Grid } from '@material-ui/core'
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import FormDialog from '../TabKonven/Dialog';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import JaringanLayananCreate from "./JaringanLayananCreate";

const dbo_user = JSON.parse(localStorage.getItem("dbo_user"));


const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

export default function JaringanPelayananList() {
  const classes = useStyles();
  const navigate = useNavigate();

  // const [dbo_konten, setKonven] = React.useState([]);

  // const url = "http://192.168.100.215:8080/tabkonven";

  // const fetchData = async () => {
  //   const result = await axios.get(url);
  //   setKonven(result.data.dbo_konten);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const [dbo_lokasi, setJaringanLayanan] = useState([]);
  const [create, setOpenCreate] = React.useState(false);

  const handleClickCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  useEffect(() => {
    getJaringanLayanan();
  }, []);

  const getJaringanLayanan = async () => {
    const dbo_lokasi = await axios.get('http://192.168.100.215:8080/jaringanpelayanan');
    setJaringanLayanan(dbo_lokasi.data);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://192.168.100.215:8080/jaringanpelayanan', {
      lokasi_nama: lokasi_nama,
      kategoriId: kategoriId.kategori_id
    })
      .then(res => {
        swal({
          title: "Berhasil!",
          text: "Data Berhasil ditambahkan",
          icon: "success",
          timer: 2000,
          button: false
        })

      })
      .catch(err => {
        console.log(err)
      });
  }
  const [lokasi_nama, setLokasiNama] = useState("");
  const [kategoriId, setKategori] = useState("");
  const getDetail = (id) => {
    navigate(`/jaringanlayanan/detaillokasilayanan/${id}`);
  };

  const UpdateJaringanPelayanan = async (id) => {
    navigate(`/updatejaringanlayanan/${id}`);
  };

  const JarPelayananDelete = async (id) => {
    await axios.delete(`http://192.168.100.215:8080/jaringanpelayanan/${id}`);
    getJaringanLayanan();
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
                    {/* <Link to="/addtabkonven"> */}
                    <Button startIcon={<AddIcon />} onClick={handleClickCreate} variant="contained" color="primary" sx={{ height: 40 }} >
                      Create
                    </Button>
                    <JaringanLayananCreate create={create} handleClose={handleCloseCreate} handleSubmit={handleSubmit} />
                    {/* </Link> */}
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
                      {dbo_lokasi.map((layanan, index) => (
                        <TableRow
                          key={layanan.lokasi_id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="right">{index + 1}</TableCell>
                          <TableCell align="left">{layanan.lokasi_nama}</TableCell>
                          <TableCell align="left"><ModeIcon color="primary" sx={{ fontSize: 18 }} />{layanan.kategori_nama}</TableCell>
                          <TableCell align="left">{layanan.konten_status}</TableCell>

                          <TableCell align="center">
                            <ButtonGroup color="primary" aria-label="outlined primary button group">

                              <Button startIcon={<EditIcon />} color="success" onClick={() => UpdateJaringanPelayanan(layanan.lokasi_id)} >
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
                                      JarPelayananDelete(layanan.lokasi_id);
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
                      {dbo_lokasi.map((layanan, index) => (
                        <TableRow
                          key={layanan.lokasi_id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="right">{index + 1}</TableCell>
                          <TableCell align="left">{layanan.lokasi_nama}</TableCell>
                          <TableCell align="left"><ModeIcon color="primary" sx={{ fontSize: 18 }} />{layanan.kategori_nama}</TableCell>
                          <TableCell align="left">{layanan.konten_status}</TableCell>

                          <TableCell align="center">
                            {/* <ButtonGroup color="primary" aria-label="outlined primary button group"> */}
                            <Button startIcon={<InfoIcon />} variant="outlined" size="small" onClick={() => getDetail(layanan.lokasi_id)}>Detail</Button>
                            {" "}
                              {/* <Button startIcon={<EditIcon />} color="success" onClick={() => UpdateJaringanPelayanan(layanan.lokasi_id)} >
                              </Button> */}
                              <Button startIcon={<DeleteIcon />} variant="outlined" color="error"
                                onClick={() =>
                                  swal({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                  }).then((result) => {
                                    if (result) {
                                      JarPelayananDelete(layanan.lokasi_id);
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
            <Container>
              <Paper>

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
                      {dbo_lokasi.map((layanan, index) => (
                        <TableRow
                          key={layanan.lokasi_id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="right">{index + 1}</TableCell>
                          <TableCell align="left">{layanan.lokasi_nama}</TableCell>
                          <TableCell align="left"><ModeIcon color="primary" sx={{ fontSize: 18 }} />{layanan.kategori_nama}</TableCell>
                          <TableCell align="left">{layanan.konten_status}</TableCell>
                          <TableCell align="center">
                            <Button startIcon={<InfoIcon />} variant="outlined" size="small" onClick={() => getDetail(layanan.lokasi_id)}>Detail</Button>
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
      })()}

    </>
  );
}