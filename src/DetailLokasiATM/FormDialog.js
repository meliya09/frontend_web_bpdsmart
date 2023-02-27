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

export default function FormDialog({ open, handleClose }) {
    const classes = useStyles();
    const axios = require('axios')
    const navigate = useNavigate();
    const { id } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://192.168.100.215:8080/detaillokasiatm/create/${id}`, {
            lokasi_nama: lokasi_nama,
            lokasi_alamat: lokasi_alamat,
            lokasi_telp: lokasi_telp,
            lokasi_fax: lokasi_fax,
            lokasi_lat: lokasi_lat,
            lokasi_lon: lokasi_lon,
           
        })
            .then(res => {
                swal({
                    title: "Berhasil!",
                    text: "Data Berhasil ditambahkan",
                    icon: "success",
                    timer: 2000,
                    button: false
                })
                window.location.href = `/lokasiatm/detaillokasiatm/${id}`;
           
            })
            .catch(err => {
                console.log(err)
            });
    }

    const [lokasi_nama, setNama] = useState("");
    const [lokasi_alamat, setAlamat] = useState("");
    const [lokasi_telp, setTelp] = useState("");
    const [lokasi_fax, setFax] = useState("");
    const [lokasi_lat, setLat] = useState("");
    const [lokasi_lon, setLon] = useState("");
   

    useEffect(() => {

    }, [])

    return (
        <div className={classes.paper} >
            <Dialog open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Tambah Data</DialogTitle>
                <DialogContent>
                        <form className={classes.form}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="lokasi_nama"
                                        name="Nama "
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lokasi_nama"
                                        label="Nama"
                                        onChange={(e) => setNama(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="lokasi_alamat"
                                        name="Alamat"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lokasi_alamat"
                                        label="Alamat"
                                        onChange={(e) => setAlamat(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="lokasi_telp"
                                        name="Telepon"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lokasi_telp"
                                        label="Telepon"
                                        onChange={(e) => setTelp(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="lokasi_fax"
                                        name="Fax"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lokasi_fax"
                                        label="Fax"
                                        onChange={(e) => setFax(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="lokasi_lat"
                                        name="Lat"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lokasi_lat"
                                        label="Lat"
                                        onChange={(e) => setLat(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="lokasi_lon"
                                        name="Lon"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lokasi_lon"
                                        label="Lon"
                                        onChange={(e) => setLon(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                
                            </Grid>
                        </form>
                        <DialogActions>
                            <Button onClick={handleClose} color="error" variant="contained">
                                Cancel
                            </Button>
                            <Button color="primary" onClick={handleSubmit} handleClose={handleClose} variant="contained">
                                Submit
                            </Button>
                        </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}