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

export default function UpdateDetail({ update, handleCloseUpdate }) {
    const classes = useStyles();
    const [konten_judul, setJudul] = useState("");
    const [konten_gambar, setGambar] = useState("");
    const [konten_deskripsi, setDeskripsi] = useState("");
    const { id } = useParams();

    useEffect(() => {
        getDetailById();
    }, []);

    const getDetailById = async () => {
        const response = await axios.get(`http://192.168.100.215:8080/detailinternal/${id}`);
        setJudul(response.data.konten_judul);
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
        formData.append("konten_gambar", konten_gambar);
        formData.append("konten_deskripsi", konten_deskripsi);
        try {
            await axios.post(`http://192.168.100.215:8080/detailinternal/update/${id}`, formData, {
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
                    window.location = '/internal/detailinternal/' + id
                })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={classes.paper} >
            <Dialog open={update}
                onClose={handleCloseUpdate}
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
                                    label="Nama Menu"
                                    id="konten_judul"
                                    value={konten_judul}
                                    onChange={(e) => setJudul(e.target.value)}
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
                        <Button onClick={handleCloseUpdate} color='error' variant="contained">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={updateDetail} handleCloseUpdate={handleCloseUpdate} variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div >
    );
}