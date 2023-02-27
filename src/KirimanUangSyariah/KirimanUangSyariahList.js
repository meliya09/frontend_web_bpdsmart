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
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from "@material-ui/core/styles";
import ModeIcon from '@mui/icons-material/Mode';
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";
import swal from 'sweetalert';
import KirimanUangSyariahCreate from "./KirimanUangSyariahCreate";


const dbo_user = JSON.parse(localStorage.getItem("dbo_user"));
const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

export default function KirimanUangSyariahList() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [dbo_konten, setKirimanUangSyariah] = useState([]);

  useEffect(() => {
    getKirimanUangSyariah();
  }, []);

  const getKirimanUangSyariah = async () => {
    const dbo_konten = await axios.get('http://192.168.100.215:8080/kirimanuangsyariah');
    setKirimanUangSyariah(dbo_konten.data);

  }

  const [create, setOpenCreate] = React.useState(false);


  const handleClickCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };


  const UpdateKirimanUangSyariah = async (id) => {
    navigate(`/updatekirimuangsyariah/${id}`);
  };

  const KirimanUangSyariahDelete = async (id) => {
    await axios.delete(`http://192.168.100.215:8080/kirimanuangsyariah/${id}`);
    getKirimanUangSyariah();
  };
  const getDetail = async (id) => {
    navigate(`/kirimanuangsyariah/detailkirimanuangsyariah/${id}`);
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
                    <KirimanUangSyariahCreate create={create} handleCloseCreate={handleCloseCreate} />

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
                          <TableCell align="center">
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                              <Button startIcon={<EditIcon />} color="success" onClick={() => UpdateKirimanUangSyariah(syariah.konten_id)} >
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
                                      KirimanUangSyariahDelete(syariah.konten_id);
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
                        <TableCell align="center">
                          {/* <ButtonGroup color="primary" aria-label="outlined primary button group"> */}
                          <Button startIcon={<InfoIcon />} variant="outlined" size="small" onClick={() => getDetail(syariah.konten_id)}>Detail</Button>
                          {" "}
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
                                    KirimanUangSyariahDelete(syariah.konten_id);
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