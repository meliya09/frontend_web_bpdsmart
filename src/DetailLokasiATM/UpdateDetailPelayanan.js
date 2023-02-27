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
import { useCallback } from "react";

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

export default function UpdateDetail({ update2, handleCloseUpdate2 }) {
    const classes = useStyles();
    const [lokasi_nama, setNama] = useState("");
    const [lokasi_alamat, setAlamat] = useState("");
    const [lokasi_telp, setTelp] = useState("");
    const [lokasi_fax, setFax] = useState("");
    const [lokasi_lat, setLat] = useState("");
    const [lokasi_lon, setLon] = useState("");
    const { id } = useParams();
    const { lokasi_id } = useParams();


    useEffect(() => {
        getDetailById();
    }, []);

    const getDetailById = async () => {
        const response = await axios.get(`http://192.168.100.215:8080/detaillokasilayananbyid/${id}`);
        setNama(response.data.lokasi_nama);
        setAlamat(response.data.lokasi_alamat);  
        setTelp(response.data.lokasi_telp);
        setFax(response.data.lokasi_fax);
        setLat(response.data.lokasi_lat);
        setLon(response.data.lokasi_lon);
    }; 


    const updateDetailPelayanan = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("lokasi_nama", lokasi_nama);
        formData.append("lokasi_alamat", lokasi_alamat);
        formData.append("lokasi_telp", lokasi_telp);
        formData.append("lokasi_fax", lokasi_fax);
        formData.append("lokasi_lat", lokasi_lat);
        formData.append("lokasi_lon", lokasi_lon);
        try {
            await axios.post(`http://192.168.100.215:8080/detaillokasilayanan/update/${id}`, formData, {
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
                    window.location = '/jaringanlayanan/detaillokasilayanan/' + id
                })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={classes.paper} >
            <Dialog open={update2}
                onClose={handleCloseUpdate2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" style={{fontWeight: 'bold',color: '#43a047', fontSize: 20 }}>Update Detail</DialogTitle>
                <DialogContent>
                    <form className={classes.form}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="lokasi_nama"
                                    variant="outlined"
                                    fullWidth
                                    label="Nama Lokasi"
                                    id="lokasi_nama"
                                    value={lokasi_nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    autoFocus
                                    style={{ backgroundColor: '#c8e6c9'}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel style={{ fontWeight: 'bold', color: '#1b5e20', fontSize: 16 }} >Alamat</InputLabel>
                                <TextareaAutosize
                                    minRows={3}
                                    autoComplete="lokasi_alamat"
                                    variant="outlined"
                                    id="lokasi_alamat"
                                    value={lokasi_alamat}
                                    onChange={(e) => setAlamat(e.target.value)}
                                    style={{ width: 535, backgroundColor: '#c8e6c9' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                 <TextField
                                    autoComplete="lokasi_telp"
                                    variant="outlined"
                                    fullWidth
                                    label="Telp"
                                    id="lokasi_telp"
                                    value={lokasi_telp}
                                    onChange={(e) => setTelp(e.target.value)}
                                    autoFocus
                                    style={{ backgroundColor: '#c8e6c9'}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                 <TextField
                                    autoComplete="lokasi_fax"
                                    variant="outlined"
                                    fullWidth
                                    label="Fax"
                                    id="lokasi_fax"
                                    value={lokasi_fax}
                                    onChange={(e) => setFax(e.target.value)}
                                    autoFocus
                                    style={{ backgroundColor: '#c8e6c9'}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="lokasi_lat"
                                    variant="outlined"
                                    fullWidth
                                    label="Lat"
                                    id="lokasi_lat"
                                    value={lokasi_lat}
                                    onChange={(e) => setLat(e.target.value)}
                                    autoFocus
                                    style={{ backgroundColor: '#c8e6c9'}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="lokasi_lon"
                                    variant="outlined"
                                    fullWidth
                                    label="Lon"
                                    id="lokasi_lon"
                                    value={lokasi_lon}
                                    onChange={(e) => setLon(e.target.value)}
                                    autoFocus
                                    style={{ backgroundColor: '#c8e6c9'}}
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
                        <Button onClick={handleCloseUpdate2} color='error' variant="contained">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={updateDetailPelayanan} handleCloseUpate2={handleCloseUpdate2} variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div >
    );
}