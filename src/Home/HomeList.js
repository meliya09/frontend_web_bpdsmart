import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import UpdateDetail from '../Home/UpdateDetail';
import UpdateDetail2 from "./UpdateDetail2";
import UpdateDetail3 from "./UpdateDetail3";


const useStyles = makeStyles((theme) => ({
    box: {
        height: 10,
        padding: 8
    }
}));


const HomeList = () => {
    const classes = useStyles();
    const [dbo_konten, setHome] = useState([]);
    const { id } = useParams()
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleClickOpen3 = () => {
        setOpen3(true);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };

    useEffect(() => {
        getHome();
    }, []);

    const getHome = async () => {
        const response = await axios.get("http://192.168.100.215:8080/home");
        setHome(response.data);
    };

    return (
        <Card border="primary" style={{ width: '61rem' }}>
            <Card.Header style={{ fontWeight: 'bold', color: 'blue', fontSize: 20 }} >PT. Bank BPD DIY </Card.Header>
            <Card.Body>
                <Card.Title style={{ fontWeight: 'bold', color: 'indigo', fontSize: 18 }}>Berita dan Informasi Terkini</Card.Title>
                <CardGroup>
                    {dbo_konten.map((home) => (
                        <Card>
                            <Card.Img variant="top" src={`http://192.168.100.215:8080${home.file_path}`} width={224} height={260} />
                            <Card.Body>
                                <Card.Text>
                                    <div style={{ fontWeight: 'bold', color: 'indigo', fontSize: 18 }}>{home.konten_judul}</div>
                                </Card.Text>
                                <Card.Text>
                                    <div dangerouslySetInnerHTML={{ __html: home.konten_deskripsi }}/>
                                    {/* <div style={{ textAlign: 'justify', color: '#424242', fontSize: 15 }}>{home.konten_deskripsi}</div> */}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer class="card-footer d-flex">
                                {/* <ButtonGroup className="btn-lg mx-auto">
                                <Button startIcon={<EditIcon />} size="small" color="success" onClick={handleClickOpen}>Update</Button>
                                <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus</Button>
                            </ButtonGroup> */}
                            </Card.Footer>
                        </Card>
                    ))}
                    {/* <Card>
                        <Card.Img variant="top" src={`http://192.168.100.215:8080${dbo_konten.file_path2}`} width={224} height={260} />
                        <Card.Body>
                            <Card.Text>
                                <div style={{ whiteSpace: "pre-wrap" }}>{dbo_konten.konten_deskripsi2}</div>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer class="card-footer d-flex">
                            <ButtonGroup className="btn-lg mx-auto">
                                <Button startIcon={<EditIcon />} size="small" color="success" onClick={handleClickOpen2}>Update</Button>
                                <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus</Button>
                            </ButtonGroup>
                        </Card.Footer>
                    </Card> */}
                    {/* <Card>
                        <Card.Img variant="top" src={`http://192.168.100.215:8080${dbo_konten.file_path3}`} width={224} height={260} />
                        <Card.Body>
                            <Card.Text>
                                <div style={{ whiteSpace: "pre-wrap" }}>{dbo_konten.konten_deskripsi3}</div>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer class="card-footer d-flex">
                            <ButtonGroup className="btn-lg mx-auto">
                                <Button startIcon={<EditIcon />} size="small" color="success" onClick={handleClickOpen3}>Update</Button>
                                <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus</Button>
                            </ButtonGroup>
                        </Card.Footer>
                    </Card> */}
                </CardGroup>
                {/* Menampilkan modal update data */}
                {/* <Box className={classes.box}> 
                <UpdateDetail open={open} handleClose={handleClose} />
                <UpdateDetail2 open2={open2} handleClose2={handleClose2} />
                <UpdateDetail3 open3={open3} handleClose3={handleClose3} />
                </Box> */}
            </Card.Body>
        </Card>
    )
}

export default HomeList