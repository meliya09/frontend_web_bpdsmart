import React, { useEffect, useRef, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";
import {ButtonGroup} from "@mui/material";
import {Link} from "react-router-dom";
import {Box} from "@mui/material";
import {Container} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LockResetIcon from '@mui/icons-material/LockReset';
import AddIcon from '@mui/icons-material/Add';
import ModeIcon from '@mui/icons-material/Mode';
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import FormDialogCreate from "./FormDialogCreate";


const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

export default function StafsList() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [dbo_user, setUser] = useState([]);
 
    useEffect(() => {
        getUser();
    },[]);
 
    const getUser = async () => {
        const dbo_user = await axios.get('http://192.168.100.215:8080/datausers');
        setUser(dbo_user.data);
        
    }
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  
    // const getStaf = async () => {
    //   const response = await axios.get('http://192.168.100.215:8080/staf');
    //   setStaf(response.data);
    // };

    // const getStaf = () => {
    //   fetch("http://192.168.100.215:8080/staf")
    //     .then(res => res.json())
    //     .then(
    //       (result) => {
    //         setStaf(result)
    //       }
    //     )
    // }
  
    const UpdateStaf = async (id) => {
      navigate(`/updatestaf/${id}`);
    };
  
  
  
    // const UpdateStaf = async (id) => {
    //   navigate(`/updatestaf/${id}`);
    // };
  
    // const StafDelete = async (id) => {
     
    //   await axios.delete(`http://192.168.100.215:8080/staf/${id}`)
    // getStaf();
    // };

  // const StafDelete = async (id, e) => {
     
  //     await axios.delete(`http://192.168.100.215:8080/staf/${id}`)
  //     e.preventDefault();
  //     swal({
  //       title: "Logout BPD DIY SMART",
  //       text: "Apakah anda yakin ingin Logout?",
  //       icon: "warning",
  //       buttons: true,
  //       dangerMode: true,
  //     }).then((willDelete) => {
  //       if (willDelete) {
  //         localStorage.removeItem("staf");
  //         localStorage.removeItem("token");
  //         window.location.href = "/stafs";
  //       }
  //     });
  //   };
  
  

    const StafDelete = async (id) => {
      await axios.delete(`http://192.168.100.215:8080/datausers/${id}`);
      getUser();
    };


  //   const editKonven = async () => {
  //     const dbo_konten = await axios.get('http://192.168.100.211:8080/konven/:id')
  //     setKonven(dbo_konten.data);
      
  // }
 
  //   const deleteKonven = async (id) =>{
  //       await axios.delete(`http://192.168.100.211:8080/konven/${id}`);
  //       getKonven();
  //   }

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
            {/* <Link to="/createstaf"> */}
            <Button startIcon={<AddIcon />} onClick={handleClickOpen} variant="contained" color="primary" sx={{ height: 40 }} >
              Create 
            </Button>
            <FormDialogCreate open={open} handleClose={handleClose}/>
           
            {/* </Link> */}
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
                <TableCell align="center">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {dbo_user.map((user, index) => (
                <TableRow 
                  key={user.user_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="left">{user.user_nama}</TableCell>
                  <TableCell align="left">{user.user_jabatan}</TableCell>
                  <TableCell align="left">{user.user_email}</TableCell>
                  <TableCell align="left">{user.user_telp}</TableCell>
                  <TableCell align="left">{user.level_nama}</TableCell>
                  <TableCell align="center">
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                {/* <Link
                    to={`/updatestaf/${staf.staf_id}`}
                    className="button is-small is-info mr-2"
                  >
                    Edit
                  </Link> */}
                <Button startIcon={<EditIcon />} color="success" onClick={() => UpdateStaf(user.user_id)}></Button>
                <Button startIcon={<LockResetIcon />} color="warning" ></Button>
                {/* <FormDialogUpdate open={open} handleClose={handleClose}/> */}
                {/* <Button startIcon={<DeleteIcon />} color="error" onClick={() => StafDelete(staf.staf_id)}></Button> */}
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
                      StafDelete(user.user_id);
                      swal({
                              title: "Deleted!",
                              text: "Your file has been deleted.",
                              icon: "success",
                              buttons: "Ok",
                            });
                    }
                  })
                  // swal({
                  //   title: "Are you sure?",
                  //   text: "You won't be able to revert this!",
                  //   icon: "warning",
                  //   buttons: true,
                  //   dangerMode: true,
                  // }).then((result) => {
                    
                  //     StafDelete(staf.staf_id);
                  //     swal({
                  //       title: "Deleted!",
                  //       text: "Your file has been deleted.",
                  //       icon: "success",
                  //       buttons: "Ok",
                  //     });
                    
                    
                  // })
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