import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import ModeIcon from '@mui/icons-material/Mode';
import { Box, Button, ButtonGroup, Container } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import Stack from '@mui/material/Stack';
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import PembiayaanCreate from "./PembiayaanCreate";

const dbo_user = JSON.parse(localStorage.getItem("dbo_user"));

const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

export default function PembiayaanList() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [dbo_konten, setPembiayaan] = useState([]);
  const [create, setOpenCreate] = React.useState(false);

  const handleClickCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  useEffect(() => {
    getPembiayaan();
  }, []);

  const getPembiayaan = async () => {
    const dbo_konten = await axios.get('http://192.168.100.215:8080/pembiayaan');
    setPembiayaan(dbo_konten.data);

  }

  const PembiayaanUpdate = async (id) => {
    navigate(`/updatepembiayaan/${id}`);
  };

  const PembiayaanDelete = async (id) => {
    await axios.delete(`http://192.168.100.215:8080/pembiayaan/${id}`);
    getPembiayaan();
  };

  const getDetail = async (id) => {
    navigate(`/pembiayaan/detailpembiayaan/${id}`);
  };

  return (
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
                    <PembiayaanCreate create={create} handleCloseCreate={handleCloseCreate} />

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
                      {dbo_konten.map((syariah, index) => (
                        <TableRow
                          key={syariah.konten_id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="right">{index + 1}</TableCell>
                          {(() => {
                            if (syariah.kategori_nama === 'Menu') {
                              return (
                                <TableCell align="left"><Link to={`${syariah.konten_url}`}>{syariah.konten_menu}</Link>

                                </TableCell>
                              )
                            } else {
                              return (
                                <TableCell align="left">{syariah.konten_menu}</TableCell>
                              )
                            }
                          })()}
                          <TableCell align="left"><ModeIcon color="primary" sx={{ fontSize: 18 }} />{syariah.kategori_nama}</TableCell>
                          <TableCell align="left">{syariah.konten_status}</TableCell>
                          {/* {(() => {
                            if (syariah.kategori_nama === 'Produk') {
                              return (
                                <TableCell align="center">
                               
                                </TableCell>
                              )
                            } else {
                             return (
                              <TableCell align="center"></TableCell>
                             )
                            }
                          })()} */}
                          <TableCell align="center">
                            <ButtonGroup color="primary" aria-label="outlined primary button group">

                              <Button startIcon={<EditIcon />} color="success" onClick={() => PembiayaanUpdate(syariah.konten_id)} >
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
                                      PembiayaanDelete(syariah.konten_id);
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
                    {dbo_konten.map((syariah, index) => (
                      <TableRow
                        key={syariah.konten_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="right">{index + 1}</TableCell>
                        {(() => {
                          if (syariah.kategori_nama === 'Menu') {
                            return (
                              <TableCell align="left"><Link to={`${syariah.konten_url}`}>{syariah.konten_menu}</Link>

                              </TableCell>
                            )
                          } else {
                            return (
                              <TableCell align="left">{syariah.konten_menu}</TableCell>
                            )
                          }
                        })()}
                        <TableCell align="left"><ModeIcon color="primary" sx={{ fontSize: 18 }} />{syariah.kategori_nama}</TableCell>
                        <TableCell align="left">{syariah.konten_status}</TableCell>
                        {(() => {
                          if (syariah.kategori_nama == 'Produk') {
                            return (
                              <TableCell align="center">
                                <Stack spacing={3} direction="row" >
                                  <Button startIcon={<InfoIcon />} variant="outlined" size="small" onClick={() => getDetail(syariah.konten_id)}>Detail</Button>
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
                                          PembiayaanDelete(syariah.konten_id);
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
                                </Stack>
                              </TableCell>
                            )
                          } else {
                            return (
                              <TableCell align="center">
                                {/* <ButtonGroup color="primary"> */}
                                {/* <Button startIcon={<EditIcon />} color="success" onClick={() => UpdateKonven(konven.konten_id)} >
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
                                        PembiayaanDelete(syariah.konten_id);
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
                            )
                          }
                        })()}
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
                  {dbo_konten.map((syariah, index) => (
                    <TableRow
                      key={syariah.konten_id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{index + 1}</TableCell>
                      {(() => {
                        if (syariah.kategori_nama === 'Menu') {
                          return (
                            <TableCell align="left"><Link to={`${syariah.konten_url}`}>{syariah.konten_menu}</Link></TableCell>
                          )
                        } else {
                          return (
                            <TableCell align="left">{syariah.konten_menu}</TableCell>
                          )
                        }
                      })()}
                      <TableCell align="left"><ModeIcon color="primary" sx={{ fontSize: 18 }} />{syariah.kategori_nama}</TableCell>
                      <TableCell align="left">{syariah.konten_status}</TableCell>
                      {(() => {
                        if (syariah.kategori_nama === 'Produk') {
                          return (
                            <TableCell align="center">
                              <Button startIcon={<InfoIcon />} variant="outlined" size="small" onClick={() => getDetail(syariah.konten_id)}>Detail</Button>
                            </TableCell>
                          )
                        } else {
                          return (
                            <TableCell align="center"></TableCell>
                          )
                        }
                      })()}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
        }
      })()}

    </>
  );
}