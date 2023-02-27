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
    const [konten_gambar2, setGambar2] = useState("");
    const [konten_gambar3, setGambar3] = useState("");
    const [konten_deskripsi, setDeskripsi] = useState("");
    const [konten_syarat, setSyarat] = useState("");
    const [konten_ketentuan, setKetentuan] = useState("");
    const [konten_fasilitas, setFasilitas] = useState("");
    const [konten_sk, setSkSe] = useState("");
    const { id } = useParams();
    const editor = useRef(null);

    useEffect(() => {
        getDetailById();
    }, []);

    const getDetailById = async () => {
        const response = await axios.get(`http://192.168.100.215:8080/detailkredit/${id}`);
        setJudul(response.data.konten_judul);
        setSubJudul(response.data.konten_subjudul);
        setGambar(response.data.konten_gambar);
        setGambar2(response.data.konten_gambar2);
        setGambar3(response.data.konten_gambar3);
        setDeskripsi(response.data.konten_deskripsi);
        setSyarat(response.data.konten_syarat);
        setKetentuan(response.data.konten_ketentuan);
        setFasilitas(response.data.konten_fasilitas);
        setSkSe(response.data.konten_sk);
    };

    const loadGambar = (e) => {
        const konten_gambar = e.target.files[0];
        setGambar(konten_gambar);
    };

    const loadGambar2 = (e) => {
        const konten_gambar2 = e.target.files[0];
        setGambar2(konten_gambar2);
    };

    const loadGambar3 = (e) => {
        const konten_gambar3 = e.target.files[0];
        setGambar3(konten_gambar3);
    };

    const updateDetail = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("konten_judul", konten_judul);
        formData.append("konten_subjudul", konten_subjudul);
        formData.append("konten_gambar", konten_gambar);
        formData.append("konten_gambar2", konten_gambar2);
        formData.append("konten_gambar3", konten_gambar3);
        formData.append("konten_deskripsi", konten_deskripsi);
        formData.append("konten_syarat", konten_syarat);
        formData.append("konten_ketentuan", konten_ketentuan);
        formData.append("konten_fasilitas", konten_fasilitas);
        formData.append("konten_sk", konten_sk);
        try {
            await axios.post(`http://192.168.100.215:8080/detailkredit/update/${id}`, formData, {
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
                    window.location = '/kredit/detailkredit/' + id
                })
        } catch (error) {
            console.log(error);
        }
        try {
            await axios.post(`http://192.168.100.215:8080/detailkredit/update2/${id}`, formData, {
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
                    window.location = '/kredit/detailkredit/' + id
                })
        } catch (error) {
            console.log(error);
        }
        try {
            await axios.post(`http://192.168.100.215:8080/detailkredit/update3/${id}`, formData, {
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
                    window.location = '/kredit/detailkredit/' + id
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
                <DialogTitle id="alert-dialog-title" style={{ fontWeight: 'bold', color: '#43a047', fontSize: 20 }}>Update Detail</DialogTitle>
                <DialogContent>
                    <form className={classes.form}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="konten_judul"
                                    variant="outlined"
                                    fullWidth
                                    label="Nama Menu"
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
                                <InputLabel style={{ fontWeight: 'bold', color: '#1b5e20', fontSize: 16 }} >Gambar 2</InputLabel>
                                <input
                                    type="file"
                                    className="file-input"
                                    onChange={loadGambar2}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ fontWeight: 'bold', color: '#1b5e20', fontSize: 16 }} >Gambar 3</InputLabel>
                                <input
                                    type="file"
                                    className="file-input"
                                    onChange={loadGambar3}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ fontWeight: 'bold', color: '#1b5e20', fontSize: 16 }}>Deskripsi</InputLabel>
                                <JoditEditor
                                    ref={editor}
                                    value={konten_deskripsi}
                                    onChange={newContent => setDeskripsi(newContent)}
                                    style={{ backgroundColor: '#c8e6c9' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ fontWeight: 'bold', color: '#1b5e20', fontSize: 16 }}>Syarat</InputLabel>
                                <JoditEditor
                                    ref={editor}
                                    value={konten_syarat}
                                    onChange={newContent => setSyarat(newContent)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ fontWeight: 'bold', color: '#1b5e20', fontSize: 16 }}>Ketentuan</InputLabel>
                                <JoditEditor
                                    ref={editor}
                                    value={konten_ketentuan}
                                    onChange={newContent => setKetentuan(newContent)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ fontWeight: 'bold', color: '#1b5e20', fontSize: 16 }}>Fasilitas Manfaat</InputLabel>
                                <JoditEditor
                                    ref={editor}
                                    value={konten_fasilitas}
                                    onChange={newContent => setFasilitas(newContent)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ fontWeight: 'bold', color: '#1b5e20', fontSize: 16 }}>Sk Se</InputLabel>
                                <JoditEditor
                                    ref={editor}
                                    value={konten_sk}
                                    onChange={newContent => setSkSe(newContent)}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Editor
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    id="konten_sk"
                                    value={konten_sk}
                                    onChange={(e) => setSkSe(e.target.value)}
                                    wrapperStyle={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}
                                />
                            </Grid> */}
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