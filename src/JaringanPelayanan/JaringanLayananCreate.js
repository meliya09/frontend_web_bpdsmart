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

export default function JaringanPelayananCreate({ create, handleCloseCreate }) {
    const classes = useStyles();
    const axios = require('axios')

    const handleChange = (value) => {
        setKategori(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://192.168.100.215:8080/jaringanpelayanan', {
            lokasi_nama: lokasi_nama,
            kategori_id: kategoriId.kategori_id
        })
            .then(res => {
                swal({
                    title: "Berhasil!",
                    text: "Data Berhasil ditambahkan",
                    icon: "success",
                    timer: 2000,
                    button: false
                })
                window.location.href = "/jaringanlayanan";
            })
            .catch(err => {
                console.log(err)
            });
    }

    const [lokasi_nama, setLokasiNama] = useState("");
    const [kategoriId, setKategori] = useState("");

    const fetchData = async () => {
        return await axios
            .get("http://192.168.100.215:8080/kategori")
            .then((result) => {
                const res = result.data;
                return res;
            });
    };

    useEffect(() => {

    }, [])

    return (
        <div className={classes.paper} >
            <Dialog open={create}
                onClose={handleCloseCreate}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Add Menu</DialogTitle>
                <DialogContent>
                        <form className={classes.form}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="lokasi_nama"
                                        name="masukkan nama menu"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lokasi_nama"
                                        label="Nama Menu"
                                        onChange={(e) => setLokasiNama(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel>Tipe Konten</InputLabel>
                                    <AsyncSelect
                                        autoFocus
                                        cacheOptions
                                        defaultOptions
                                        menuPortalTarget={document.body}
                                        styles={{
                                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                                          }}
                                        loadOptions={fetchData}
                                        getOptionLabel={(e) => e.kategori_nama}
                                        getOptionValue={(option) => option.kategori_id}
                                        onChange={(e) => handleChange(e)}
                                        placeholder="Pilih Tipe Konten"
                                        isSearchable={false}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                        <DialogActions>
                            <Button onClick={handleCloseCreate} color="secondary" variant="outlined">
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