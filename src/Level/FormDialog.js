import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@material-ui/core/Grid';
import AsyncSelect from "react-select/async";
import swal from 'sweetalert';
import InputLabel from "@mui/material/InputLabel";
import {Dialog} from "@mui/material";
import {DialogActions} from "@mui/material";
import {DialogContent} from "@mui/material";
import {DialogTitle} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";

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

export default function FormDialog({ create, handleCloseCreate }) {
    const classes = useStyles();
    const axios = require('axios')
    const navigate = useNavigate();
    const { id } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://192.168.100.215:8080/level', {
            level_nama: level_nama,
        })
            .then(res => {
                swal({
                    title: "Berhasil!",
                    text: "Data Berhasil ditambahkan",
                    icon: "success",
                    timer: 2000,
                    button: false
                })
                window.location.href = "/divisi";
            })
            .catch(err => {
                console.log(err)
            });
    }

    const [level_nama, setLevelNama] = useState("");

    useEffect(() => {

    }, [])

    return (
        <div className={classes.paper} >
            <Dialog open={create}
                onClose={handleCloseCreate}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Tambah Data Divisi</DialogTitle>
                <DialogContent>
                        <form className={classes.form}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="level_nama"
                                        name="Nama "
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="level_nama"
                                        label="Nama Level User"
                                        onChange={(e) => setLevelNama(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                </Grid>
                        </form>
                        <DialogActions>
                            <Button onClick={handleCloseCreate} color="error" variant="contained">
                                Cancel
                            </Button>
                            <Button color="primary" onClick={handleSubmit} handleClose={handleCloseCreate} variant="contained">
                                Submit
                            </Button>
                        </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}