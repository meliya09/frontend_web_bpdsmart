import React, { useEffect, useState, useCallback} from "react";
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
import axios from "axios";
import FormDialog from "../Level/FormDialog";
import FormDialogUpdate from "../Level/FormDialogUpdate";
import LockIcon from '@mui/icons-material/Lock';
import swal from "sweetalert";


const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

export default function LevelList() {
  const classes = useStyles();
  const { id } = useParams()
  const navigate = useNavigate();
  const [dbo_level, setLevel] = useState([]);
  const [dbo_level_link_konten, setLevelLink] = useState([]);
  const [create, setOpenCreate] = React.useState(false);
  const [update, setOpenUpdate] = React.useState(false);

  const handleClickCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  // const handleClickUpdate = () => {
  //   setOpenUpdate(true);
  // };

  //   const handleClickUpdate = React.useCallback((id) => () => {
  //     setOpenUpdate(!update);
  //     console.log(`Level id: ${id}`);
  // }, []);


    // const handleCloseUpdate = () => {
    //   setOpenUpdate(false);
    // }; 

  useEffect(() => {
    getLevel();
  }, []);

  const getLevel = async () => {
    const dbo_level = await axios.get("http://192.168.100.215:8080/level");
    setLevel(dbo_level.data);
  }

  // useEffect(() => {
  //   getLevelLink();
  // }, []);

  // const getLevelLink = async () => {
  //   const dbo_level_link_konten = await axios.get("http://192.168.100.215:8080/levellink");
  //   setLevelLink(dbo_level_link_konten.data);
  // }

  React.useEffect(() => {
    getLevelLink()
  }, []);
  const getLevelLink = async () => {
    
      try {
        const response = await axios.get(`http://192.168.100.215:8080/levellink`)
      
        const konten_id = response.data.map((data) => {
          return data.konten_id
        })
      
        setLevelLink(konten_id)
      } catch (error) {
        console.error(error);
      }
    
  }

  const LevelDelete = async (id) => {
    await axios.delete(`http://192.168.100.215:8080/level/${id}`);
    getLevel();
  };

  const UpdateDivisi = async (id) => {
    navigate(`/updatedivisi/${id}`);
  };

  const getPrivilege = async (id) => {
    navigate(`/divisi/privilege/${id}`);
  };


  return (
    // View produk konven admin
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
              <Button startIcon={<AddIcon />} onClick={handleClickCreate} variant="contained" color="primary" sx={{ height: 40 }} >
                Create
              </Button>
              <FormDialog create={create} handleCloseCreate={handleCloseCreate} />
              {/* <FormDialogUpdate update={update} handleCloseUpdate={handleCloseUpdate} /> */}
            
            </Box>
          </Box>
          <br />
          <TableContainer component={Paper}> 
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">No</TableCell>
                  <TableCell align="left">Level User</TableCell>
                  <TableCell align="left">Level Akses</TableCell>
                  <TableCell align="center">Kewenangan</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dbo_level.map((level, index) => (
                  <TableRow
                    key={level.level_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="left">{level.level_nama}</TableCell>
                    <TableCell align="left">{level.konten_menu}</TableCell>
                    <TableCell align="center">
                      <Button startIcon={<LockIcon />} variant="outlined" size="small" onClick={() => getPrivilege(level.level_id)}>Kewenangan</Button>
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button startIcon={<EditIcon />} color="success" onClick={() => UpdateDivisi(level.level_id)}></Button>
                        {/* <FormDialogUpdate update={update} handleCloseUpdate={handleCloseUpdate} /> */}
                        {/* {update === level.id && <FormDialogUpdate open={() => handleClickUpdate(level.level_id)}  />} */}
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
                                LevelDelete(level.level_id);
                                swal({
                                  title: "Deleted!",
                                  text: "Data Berhasil Dihapus",
                                  icon: "success",
                                  timer: 2000,
                                  button: false,
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
    </>
  );
}
