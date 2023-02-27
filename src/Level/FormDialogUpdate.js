import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@material-ui/core/Grid';
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Row } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function FormDialogUpdate({ update, handleCloseUpdate }) {
    const classes = useStyles();
    const axios = require('axios');
    const { id } = useParams();
    const [level_nama, setLevelNama] = useState('');

    // useEffect(() => {
    //     fetch(`http://192.168.100.215:8080/level/`+id)
    //     .then(res => res.json())
    //     .then(
    //       (result) => {
    //         setLevelNama(result.level.level_nama)
    //       }
    //     )
    // }, [id])

//     useEffect(() => {
//     if (id) {
//       axios.get(`http://192.168.100.215:8080/level/${id}`)
//       .then(res => res.json())
//           .then(
//             (result) => {
//               setLevelNama(result.level.level_nama)
//             }
//           ).console.log(setLevelNama);
//     }
//   }, [id]);
 
    // useEffect(() => {
    //     getLevelById();
    // }, []);

    // const getLevelById = async () => {
    //     const response = await axios.get(`http://192.168.100.215:8080/level/${id}`);
    //     setLevelNama(response.data.level_nama);
    // };

    const getLevelById = (id) => {
        axios
        .get(`http://192.168.100.215:8080/level/${id}`)
        .then((response) => {
          const level_nama = response.data;
          setLevelNama(level_nama);
          console.log(level_nama);
        })
        .catch((error) => {
          console.log(" error", error);
        });
      };
      React.useEffect(() => {
       if (id) {
        getLevelById(id);
      }
    }, [id]);

    const updateLevel = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("level_nama", level_nama); 
        try {
            await axios.post(`http://192.168.100.215:8080/level/update/${id}`, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            })
                .then(res => {
                    swal({
                        title: "Berhasil!",
                        text: "Data Berhasil diupdate",
                        icon: "success",
                        timer: 2000,
                        button: false
                    })
                    window.location = '/divisi'
                })
        } catch (error) {
            console.log(error);
        }
    };

    // onChange = e => {
    //     setLevelNama({ [e.target.name]: e.target.value })
    // }
    

    return (
        <div className={classes.paper} >
            <Dialog open={update === id}
                onClose={handleCloseUpdate}
                // onUpdateDivisi={onUpdateDivisi}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Update Divisi</DialogTitle>
                <DialogContent>
                    <form className={classes.form}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="level_nama"
                                    name="level_nama"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="level_nama"
                                    label="Level nama"
                                    value={level_nama}
                                    onChange={(e) => setLevelNama(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                    </form>
                    <DialogActions>
                        <Button onClick={handleCloseUpdate} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={updateLevel} handleCloseUpdate={handleCloseUpdate} variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}