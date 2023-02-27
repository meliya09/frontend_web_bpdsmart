import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TableCell } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import { TableBody } from "semantic-ui-react";
import { Table } from "reactstrap";
import { Container } from "@material-ui/core";
import { Paper } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import FormDialog from "./FormDialog";
import UpdateDetail from "./UpdateDetail";
// import UpdateDetailPelayanan from "./UpdateDetailPelayanan";

const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

function DetailLokasiLayananList() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [dbo_lokasi, setDetail] = useState([]);
  const [lokasi_layanan, setDetailLokasi] = useState([]);
  const { id } = useParams()
  const [update, setOpenUpdate] = React.useState(false);
  // const [update2, setOpenUpdate2] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleClickUpdate2 = () => {
  //   setOpenUpdate2(true);
  // };

  //   const handleClickUpdate2 = React.useCallback((id) => () => {
  //     setOpenUpdate2(!update2);
  //     console.log(`lokasi id: ${id}`);
  // }, []);

  //   const handleCloseUpdate2 = () => {
  //     setOpenUpdate2(false);
  //   };

  const UpdateLokasi = async (id) => {
    navigate(`/updatelokasi/${id}`);
  };

  const LokasiDelete = async (id) => {
    await axios.delete(`http://192.168.100.215:8080/detaillokasilayanan/${id}`);
  };

  useEffect(() => {
    if (id) {
      axios.get(`http://192.168.100.215:8080/lokasilayanan/${id}`)
        .then(res => {
          setDetail(res.data)
        })
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      axios.get(`http://192.168.100.215:8080/detaillokasilayanan/${id}`)
        .then(res => {
          setDetailLokasi(res.data)
        })
    }
  }, [id]);


  return (
    <>
      <div class="d-flex justify-content-center">
        <Card>
          <Card.Header as="h3">{dbo_lokasi.lokasi_nama}</Card.Header>
          <Card.Img variant="top" src={`http://192.168.100.215:8080${dbo_lokasi.file_path}`}></Card.Img>
          <Card.Body>
            <Card.Title>{dbo_lokasi.lokasi_nama}</Card.Title>
            <Card.Text>{dbo_lokasi.lokasi_alamat}</Card.Text>
            <Card.Text>Telp: {dbo_lokasi.lokasi_telp}</Card.Text>
            <Card.Text>Fax: {dbo_lokasi.lokasi_fax}</Card.Text>
            <Card.Text>Lat: {dbo_lokasi.lokasi_lat}</Card.Text>
            <Card.Text>Lon: {dbo_lokasi.lokasi_lon}</Card.Text>
            <br />
            <Box
              m={1}
              display="flex"
              justifyContent="center"
              alignItem="center"
              className={classes.box}
            >
              <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button startIcon={<EditIcon />} color="success" onClick={handleClickUpdate}>Update</Button>
                {/* <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus</Button> */}
              </ButtonGroup>
              <UpdateDetail update={update} handleCloseUpdate={handleCloseUpdate} />
              {/* <UpdateDetailPelayanan update2={update2} handleCloseUpdate2={handleCloseUpdate2} /> */}
            </Box>
          </Card.Body>
        </Card>
      </div>
      <br />

      <Container defaultActiveKey="0">
        <Paper>
          <Box>
            <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItem="flex-end"
              className={classes.box}
            >
              <Button startIcon={<AddIcon />} onClick={handleClickOpen} variant="contained" color="primary" sx={{ height: 40 }} >
                Create
              </Button>
              <FormDialog open={open} handleClose={handleClose} />
            </Box>
          </Box>

          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">No</TableCell>
                  <TableCell align="left">Nama Menu</TableCell>
                  <TableCell align="left">Alamat</TableCell>
                  <TableCell align="left">Telepon</TableCell>
                  <TableCell align="left">Fax</TableCell>
                  <TableCell align="left">Lat</TableCell>
                  <TableCell align="left">Lon</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lokasi_layanan.map((lokasi, index) => (
                  <TableRow
                    key={lokasi_layanan.lokasi_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="left">{lokasi.lokasi_nama}</TableCell>
                    <TableCell align="left">{lokasi.lokasi_alamat}</TableCell>
                    <TableCell align="left">{lokasi.lokasi_telp}</TableCell>
                    <TableCell align="left">{lokasi.lokasi_fax}</TableCell>
                    <TableCell align="left">{lokasi.lokasi_lat}</TableCell>
                    <TableCell align="left">{lokasi.lokasi_lon}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button startIcon={<EditIcon />} color="success" onClick={() => UpdateLokasi(lokasi.lokasi_id)}></Button>
                        <Button startIcon={<DeleteIcon />} color="error"
                          onClick={() =>
                            swal({
                              title: "Apakah Anda Yakin?",
                              text: "Data Akan Terhapus!",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            }).then((result) => {
                              if (result) {
                                LokasiDelete(lokasi.lokasi_id);
                                swal({
                                  title: "Deleted!",
                                  text: "Data Berhasil Dihapus",
                                  icon: "success",
                                  timer: 2000,
                                  button: false,
                                });
                                window.location = '/jaringanlayanan/detaillokasilayanan/' + id
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
    </>
  );
}

export default DetailLokasiLayananList;