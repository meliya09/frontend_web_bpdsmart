import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@material-ui/core/Grid';
import AsyncSelect from "react-select/async";
import Select from 'react-select';
import swal from 'sweetalert';
import InputLabel from "@mui/material/InputLabel";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";


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

export default function FormDialogCreate({ open, handleClose }) {
    const classes = useStyles();
    const axios = require('axios');

    const handleChange = (value) => { 
        setDivisi(value);
    };

    const handleChange2 = (value) => {
        setAdmin(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://192.168.100.215:8080/datausers', {
            user_nama: user_nama,
            user_jabatan: user_jabatan,
            user_email: user_email,
            user_password: user_password,
            user_telp: user_telp,
            level_id: levelId.level_id,
            user_admin: user_admin.value,
        })
            .then(res => {
                swal({
                    title: "Berhasil!",
                    text: "Data Berhasil ditambahkan",
                    icon: "success",
                    timer: 2000,
                    button: false
                })
                window.location.href = "/users";
            })
            .catch(err => {
                console.log(err)
            });
    }

    const [user_nama, setNama] = useState('');
    const [user_jabatan, setJabatan] = useState('');
    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('123456');
    const [user_telp, setTelp] = useState('');
    const [user_id, setID] = useState('');
    const [levelId, setDivisi] = useState("");
    const [user_admin, setAdmin] = useState('');


    const fetchData = async () => {
        return await axios
            .get("http://192.168.100.215:8080/level")
            .then((result) => {
                const res = result.data;
                return res;
            });
    };

    useEffect(() => {

    }, []) 

    const levelUser = [
        { label: 'SuperAdmin', value: '1' },
        { label: 'Approval', value: '2' },
        { label: 'Admin', value: '3' },
    ];

    return (
        <div className={classes.paper} >
            <Dialog open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Add Staf</DialogTitle>
                <DialogContent>
                    <form className={classes.form}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="user_nama"
                                    name="masukkan nama "
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="user_nama"
                                    label="Nama Staf"
                                    onChange={(e) => setNama(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="user_jabatan"
                                    name="masukkan jabatan"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="user_jabatan"
                                    label="Jabatan"
                                    onChange={(e) => setJabatan(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="user_email"
                                    name="masukkan email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="user_email"
                                    label="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                        {/* <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="user_password"
                                    name="masukkan password"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="user_password"
                                    label="Password"
                                    value={'123456'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                        </Grid> */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="user_telp"
                                    name="masukkan telp"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="user_telp"
                                    label="No. Telp"
                                    onChange={(e) => setTelp(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Divisi</InputLabel>
                                <AsyncSelect
                                    autoFocus
                                    cacheOptions
                                    defaultOptions
                                    menuPortalTarget={document.body}
                                    styles={{
                                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                                    }}
                                    loadOptions={fetchData}
                                    getOptionLabel={(e) => e.level_nama}
                                    getOptionValue={(option) => option.level_id}
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Pilih Divisi"
                                    isSearchable={false}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Level User</InputLabel>
                                <Select
                                    menuPortalTarget={document.body}
                                    styles={{
                                        menuPortal: base => ({ ...base, zIndex: 9999 }),
                                    }}
                                    options={levelUser}
                                    placeholder="Pilih Level User"
                                    onChange={(e) => handleChange2(e)}
                                />
                            </Grid>
                        </Grid>
                    </form>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={handleSubmit} handleClose={handleClose} variant="contained">
                            {user_id ? "Update" : "Submit"}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}