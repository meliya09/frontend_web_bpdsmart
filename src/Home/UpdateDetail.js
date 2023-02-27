import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import JoditEditor from 'jodit-react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextField from '@mui/material/TextField';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import InputLabel from "@mui/material/InputLabel";
import { indigo } from '@mui/material/colors';

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

export default function UpdateDetail({ open, handleClose }) {
    const classes = useStyles();
    const [konten_judul, setJudul] = useState("");
    const [konten_subjudul, setSubJudul] = useState("");
    const [konten_gambar, setGambar] = useState("");
    const [konten_deskripsi, setDeskripsi] = useState("");
    const { id } = useParams();
    const editor = useRef(null);

    useEffect(() => {
        getDetailById();
    }, []);

    const getDetailById = async () => {
        const response = await axios.get(`http://192.168.100.215:8080/home/${id}`);
        setJudul(response.data.konten_judul);
        setSubJudul(response.data.konten_subjudul);
        setGambar(response.data.konten_gambar);
        setDeskripsi(response.data.konten_deskripsi);
    };

    const loadGambar = (e) => {
        const konten_gambar = e.target.files[0];
        setGambar(konten_gambar);
    };

    const updateDetail = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("konten_judul", konten_judul);
        formData.append("konten_subjudul", konten_subjudul);
        formData.append("konten_gambar", konten_gambar);
        formData.append("konten_deskripsi", konten_deskripsi);
        try {
            await axios.post(`http://192.168.100.215:8080/home/update/${id}`, formData, {
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
                        button: false,
                    })
                    window.location = '/home/' + id
                })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={classes.paper} >
            <Dialog open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" style={{fontWeight: 'bold',color: '#43a047', fontSize: 20 }}>Update Detail</DialogTitle>
                <DialogContent>
                    <form className={classes.form}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="konten_judul"
                                    variant="outlined"
                                    fullWidth
                                    label="Judul"
                                    id="konten_judul"
                                    value={konten_judul}
                                    onChange={(e) => setJudul(e.target.value)}
                                    autoFocus
                                    style={{ backgroundColor: '#c8e6c9'}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="konten_subjudul"
                                    variant="outlined"
                                    fullWidth
                                    label="Sub Judul"
                                    id="konten_subjudul"
                                    value={konten_subjudul}
                                    onChange={(e) => setSubJudul(e.target.value)}
                                    autoFocus
                                    style={{ backgroundColor: '#c8e6c9'}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <InputLabel style={{fontWeight: 'bold',color: '#1b5e20', fontSize: 16 }} >Gambar</InputLabel>
                                <input
                                    type="file"
                                    className="file-input"
                                    onChange={loadGambar}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{fontWeight: 'bold',color: '#1b5e20', fontSize: 16 }}>Deskripsi</InputLabel>
                               <JoditEditor
                                    ref={editor}
                                    value={konten_deskripsi}
                                    onChange={newContent => setDeskripsi(newContent)}
                                    style={{ backgroundColor: '#c8e6c9' }}
                                />
                            </Grid>
                        </Grid>
                        
                    </form>
                    <DialogActions>
                        <Button onClick={handleClose} color='error' variant="contained">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={updateDetail} handleClose={handleClose} variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div >
    );
}