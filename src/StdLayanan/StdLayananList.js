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
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ModeIcon from '@mui/icons-material/Mode';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import InfoIcon from '@mui/icons-material/Info';
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import StdLayananCreate from "./StdLayananCreate";

const dbo_user = JSON.parse(localStorage.getItem("dbo_user"));

const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

export default function StdLayananList() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [dbo_konten, setStdLayanan] = useState([]);
  const [create, setOpenCreate] = React.useState(false);


  const handleClickCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  useEffect(() => {
    getStdLayanan();
  }, []);

  const getStdLayanan = async () => {
    const dbo_konten = await axios.get('http://192.168.100.215:8080/stdlayanan');
    setStdLayanan(dbo_konten.data);

  }

  const getDetail = async (id) => {
    navigate(`/stdlayanan/detailstdlayanan/${id}`);
  };

  const UpdateStdLayanan = async (id) => {
    navigate(`/updatestdlayanan/${id}`);
  };

  const StdLayananDelete = async (id) => {
    await axios.delete(`http://192.168.100.215:8080/stdlayanan/${id}`);
    getStdLayanan();
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

                    <Button startIcon={<AddIcon />} onClick={handleClickCreate} variant="contained" color="primary" sx={{ height: 40 }} >
                      Create
                    </Button>
                    <StdLayananCreate create={create} handleCloseCreate={handleCloseCreate} />
                    {/* <ProdukKonvenUpdate update={update} handleCloseUpdate={handleCloseUpdate} /> */}

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
                      {dbo_konten.map((stdlayanan, index) => (
                        <TableRow
                          key={stdlayanan.konten_id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="right">{index + 1}</TableCell>
                          {(() => {
                            if (stdlayanan.kategori_nama === 'Menu') {
                              return (
                                <TableCell align="left"><Link to={`${stdlayanan.konten_url}`}>{stdlayanan.konten_menu}</Link></TableCell>
                              )
                            } else {
                              return (
                                <TableCell align="left">{stdlayanan.konten_menu}</TableCell>
                              )
                            }
                          })()}
                          <TableCell align="left"><ModeIcon color="primary" sx={{ fontSize: 18 }} />{stdlayanan.kategori_nama}</TableCell>
                          <TableCell align="left">{stdlayanan.konten_status}</TableCell>
                          <TableCell align="center">
                            <ButtonGroup color="primary" aria-label="outlined primary button group">

                              <Button startIcon={<EditIcon />} color="success" onClick={() => UpdateStdLayanan(stdlayanan.konten_id)}>
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
                                      StdLayananDelete(stdlayanan.konten_id);
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
                    {dbo_konten.map((konven, index) => (
                      <TableRow
                        key={konven.konten_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="right">{index + 1}</TableCell>
                        {(() => {
                          if (konven.kategori_nama === 'Menu') {
                            return (
                              <TableCell align="left"><Link to={`${konven.konten_url}`}>{konven.konten_menu}</Link>

                              </TableCell>
                            )
                          } else {
                            return (
                              <TableCell align="left">{konven.konten_menu}</TableCell>
                            )
                          }
                        })()}
                        <TableCell align="left"><ModeIcon color="primary" sx={{ fontSize: 18 }} />{konven.kategori_nama}</TableCell>
                        <TableCell align="left">{konven.konten_status}</TableCell>
                        <TableCell align="center">
                          <ButtonGroup color="primary" aria-label="outlined primary button group">
                            {/* <Button startIcon={<EditIcon />} color="success" onClick={() => UpdateKonven(konven.konten_id)} >
                            </Button> */}
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
                                    StdLayananDelete(konven.konten_id);
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
                  {dbo_konten.map((stdlayanan, index) => (
                    <TableRow
                      key={stdlayanan.konten_id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{index + 1}</TableCell>
                      {(() => {
                        if (stdlayanan.kategori_nama === 'Menu') {
                          return (
                            <TableCell align="left"><Link to={`${stdlayanan.konten_url}`}>{stdlayanan.konten_menu}</Link></TableCell>
                          )
                        } else {
                          return (
                            <TableCell align="left">{stdlayanan.konten_menu}</TableCell>
                          )
                        }
                      })()}
                      <TableCell align="left"><ModeIcon color="primary" sx={{ fontSize: 18 }} />{stdlayanan.kategori_nama}</TableCell>
                      <TableCell align="left">{stdlayanan.konten_status}</TableCell>
                      {(() => {
                        if (stdlayanan.kategori_nama === 'Menu') {
                          return (
                            <TableCell align="center"></TableCell>
                          )
                        } else {
                          return (
                            <TableCell align="center">
                              <Button startIcon={<InfoIcon />} variant="outlined" size="small" onClick={() => getDetail(stdlayanan.konten_id)}>Detail</Button>
                            </TableCell>
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