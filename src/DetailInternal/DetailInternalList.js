import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import { useParams,useNavigate } from "react-router-dom";
import { TableBody } from "semantic-ui-react";
import { Table } from "reactstrap";
import { Container } from "@material-ui/core";
import { Paper } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import swal from "sweetalert";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import InfoIcon from '@mui/icons-material/Info'; 
import { Button ,TableCell} from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
// import UpdateDetail from "./UpdateDetail";
import AddIcon from '@mui/icons-material/Add';
import FormDialog from "./FormDialog";
import InfoDetail from "./InfoDetail";
import FormUpdate from "./FormUpdate";

const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

function DetailInternalList() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [dbo_konten, setDetail] = useState([]);
  const { id } = useParams()
  const [open, setOpen] = React.useState(false);
  // const [update, setOpenUpdate] = React.useState(false);
  // const [info, setOpenInfo] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const InfoDetail = async (id) => {
    navigate(`/detailnews/${id}`);
  };

  const UpdateDetailInternal = async (id) => {
    navigate(`/updatenews/${id}`);
  };

  // const handleClickUpdate = () => {
  //   setOpenUpdate(true);
  // };

  // const handleCloseUpdate = () => {
  //   setOpenUpdate(false);
  // };

  // const handleClickInfo = (id) => {
  //   setOpenInfo(true);
  // };

  // const handleCloseInfo = () => {
  //   setOpenInfo(false);
  // };

  useEffect(() => {
    if (id) {
      axios.get(`http://192.168.100.215:8080/detailinternal/${id}`)
        .then(res => {
          setDetail(res.data)
        })
    }
  }, [id]);

  const Delete = async (id) => {
    await axios.delete(`http://192.168.100.215:8080/detailinternal/${id}`);
  };

  return (
    <>
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
              <Button startIcon={<AddIcon />} onClick={handleClickOpen} variant="contained" color="primary" sx={{ height: 40 }} >
                Create
              </Button>
              <FormDialog open={open} handleClose={handleClose} />
              {/* <UpdateDetail update={update} handleCloseUpdate={handleCloseUpdate} /> */}
              {/* <InfoDetail info={info} handleCloseInfo={handleCloseInfo} /> */}
            </Box>
          </Box>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">No</TableCell>
                  <TableCell align="left">Judul Berita</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dbo_konten.map((internal, index) => (
                  <TableRow
                    key={internal.konten_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="left">{internal.konten_judul}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button startIcon={<InfoIcon />} color="primary" onClick={() => InfoDetail(internal.konten_id)}></Button>
                      <Button startIcon={<EditIcon />} color="success" onClick={() => UpdateDetailInternal(internal.konten_id)}></Button>
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
                                Delete(internal.konten_id);
                                swal({
                                  title: "Deleted!",
                                  text: "Data Berhasil Dihapus",
                                  icon: "success",
                                  timer: 2000,
                                  button: false,
                                });
                                window.location = '/informasi/detailinternal/' + id
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

export default DetailInternalList;