import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import TextField from '@mui/material/TextField';
import axios from "axios";
import JoditEditor from 'jodit-react';
import React, { useRef, useState } from "react";
import Figure from 'react-bootstrap/Figure';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';

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
    const [konten_judul, setJudul] = useState("");
    const [konten_gambar, setGambar] = useState("");
    const [file_path, setPreview] = useState("");
    const [konten_deskripsi, setDeskripsi] = useState("");
    const { id } = useParams();
    const editor = useRef(null);

    const loadGambar = (e) => {
        const konten_gambar = e.target.files[0];
        setGambar(konten_gambar);
        setPreview(URL.createObjectURL(konten_gambar));
    };

    const AddDetail = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("konten_judul", konten_judul);
        formData.append("konten_gambar", konten_gambar);
        formData.append("konten_deskripsi", konten_deskripsi);
        try {
            await axios.post(`http://192.168.100.215:8080/detailinternal/create/${id}`, formData, {
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
                    window.location = '/informasi/detailinternal/' + id
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
                <DialogTitle id="alert-dialog-title" style={{ fontWeight: 'bold', color: '#43a047', fontSize: 20 }}>Tambah Data</DialogTitle>
                <DialogContent>
                    <form className={classes.form}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="konten_judul"
                                    variant="outlined"
                                    fullWidth
                                    label="Judul Berita"
                                    id="konten_judul"
                                    value={konten_judul}
                                    onChange={(e) => setJudul(e.target.value)}
                                    autoFocus
                                    style={{ backgroundColor: '#c8e6c9' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ fontWeight: 'bold', color: '#1b5e20', fontSize: 16 }} >Gambar</InputLabel>
                                <input
                                    type="file"
                                    className="file-input"
                                    onChange={loadGambar}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {file_path ? (
                                    <Figure>
                                        <Figure.Image
                                            width={171}
                                            height={180}
                                            alt="Preview Image"
                                            src={file_path}
                                        />
                                    </Figure>
                                ) : (
                                    ""
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ fontWeight: 'bold', color: '#1b5e20', fontSize: 16 }}>Deskripsi</InputLabel>
                                {/* <TextareaAutosize
                                    minRows={3}
                                    autoComplete="konten_deskripsi"
                                    variant="outlined"
                                    id="konten_deskripsi"
                                    value={konten_deskripsi}
                                    onChange={(e) => setDeskripsi(e.target.value)}
                                    style={{ width: 546, backgroundColor: '#c8e6c9' }}
                                /> */}
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
                        <Button color="primary" onClick={AddDetail} handleClose={handleClose} variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div >
    );
}