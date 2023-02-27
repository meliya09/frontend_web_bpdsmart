import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import { useParams, Link, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import UpdateDetail from "./UpdateDetail";
import swal from 'sweetalert';
import CheckCircle from '@mui/icons-material/CheckCircle';                                            

const dbo_user = JSON.parse(localStorage.getItem("dbo_user"));


const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

function DetailKreditKonsumerList() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [dbo_konten, setDetail] = useState([]);
  const { id } = useParams()
  const [open, setOpen] = React.useState(false); 
  
  const handleClickOpen = () => { 
    setOpen(true); 
  }; 
 
  const handleClose = () => { 
    setOpen(false); 
  }; 

  
  useEffect(() => {
    if (id) {
      axios.get(`http://192.168.100.215:8080/detailkreditkonsumer/${id}`)
        .then(res => {
          setDetail(res.data)
        })
    }
  }, [id]);

  const approve = async (id) => {
    await axios.post(`http://192.168.100.215:8080/detailkreditkonsumer/approve/${id}`);
    setDetail();
  };


  return (
    <>
     {(() => {
        if (dbo_user.user_admin === "2") {
          return (
            <>
              {(() => {
                if (dbo_konten.konten_approval === "0") {
                  return (
                    <>
                      <style>{`
                table,tr,td{
                border:1px solid black;
                text-align: left;
                padding: 8px;
                background-color: #f5f5f5;
                }
                `}</style>
                      <Card border="primary" style={{ width: '61rem' }}>
                        <Card.Header>
                          <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={3}>
                              <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div" style={{ fontWeight: 'bold', color: 'blue', fontSize: 20 }}>
                                  {dbo_konten.konten_judul}
                                </Typography>
                              </Grid>
                              <Grid item xs>
                                <Typography>
                                  <Button style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: "auto" }} startIcon={<CheckCircle />} variant="outlined" color="success" onClick={() =>
                                    swal({
                                      title: "Are you sure?",
                                      text: "You Approved Data!",
                                      icon: "warning",
                                      buttons: true,
                                      dangerMode: true,
                                    }).then((result) => {
                                      if (result) {
                                        approve(dbo_konten.konten_id);
                                        swal({
                                          title: "Approved!",
                                          text: "Your file has been approved.",
                                          icon: "success",
                                          buttons: "Ok",
                                        });
                                        navigate(-1);
                                      }
                                    })
                                  }>APPROVE</Button>
                                  {/* <Button style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: "auto" }} startIcon={<EditIcon />} color="success" onClick={handleClickOpen}>Update</Button> */}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Card.Header>
                        <Card.Body>
                          <Card.Title style={{ fontWeight: 'bold', color: 'indigo', fontSize: 18 }}>{dbo_konten.konten_subjudul}</Card.Title>
                          <CardGroup>
                            <Card>
                              <Card.Img variant="top" src={`http://192.168.100.215:8080${dbo_konten.file_path}`} width={224} height={260} />
                              <Card.Footer class="card-footer d-flex">
                                <ButtonGroup className="btn-lg mx-auto">
                                  <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus Foto</Button>
                                </ButtonGroup>
                              </Card.Footer>
                            </Card>
                            <Card>
                              <Card.Img variant="top" src={`http://192.168.100.215:8080${dbo_konten.file_path2}`} width={224} height={260} />
                              <Card.Footer class="card-footer d-flex">
                                <ButtonGroup className="btn-lg mx-auto">
                                  <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus Foto</Button>
                                </ButtonGroup>
                              </Card.Footer>
                            </Card>
                            <Card>
                              <Card.Img variant="top" src={`http://192.168.100.215:8080${dbo_konten.file_path3}`} width={224} height={260} />
                              <Card.Footer class="card-footer d-flex">
                                <ButtonGroup className="btn-lg mx-auto">
                                  <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus Foto</Button>
                                </ButtonGroup>
                              </Card.Footer>
                            </Card>
                          </CardGroup>
                          <br />
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Deskripsi</Accordion.Header>
                              <Accordion.Body>
                                <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_deskripsi }} />
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Syarat</Accordion.Header>
                              <Accordion.Body>
                                <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_syarat }} />
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>Ketentuan</Accordion.Header>
                              <Accordion.Body>
                                <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_ketentuan }} />
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                              <Accordion.Header>Fasilitas dan Manfaat</Accordion.Header>
                              <Accordion.Body>
                                <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_fasilitas }} />
                              </Accordion.Body>
                            </Accordion.Item>
                            {/* <Accordion.Item eventKey="1">
        <Accordion.Header>Promosi</Accordion.Header>
        <Accordion.Body>
        <div style={{whiteSpace: "pre-wrap"}}>{dbo_konten.konten_promosi}</div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Simulasi</Accordion.Header>
        <Accordion.Body>
        <div style={{whiteSpace: "pre-wrap"}}>{dbo_konten.konten_simulasi}</div>
        </Accordion.Body>
      </Accordion.Item> */}
                            <Accordion.Item eventKey="4">
                              <Accordion.Header>SK/SE</Accordion.Header>
                              <Accordion.Body>
                                <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_sk }} />
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                          {/* Menampilkan modal update data */}
                          <Box className={classes.box}>
                            <UpdateDetail open={open} handleClose={handleClose} />
                          </Box>
                        </Card.Body>
                      </Card>
                    </>
                  )
                }
                if (dbo_konten.konten_approval === "1") {
                  return (
                    <>
                      <style>{`
                table,tr,td{
                border:1px solid black;
                text-align: left;
                padding: 8px;
                background-color: #f5f5f5;
                }
                `}</style>
                      <Card border="primary" style={{ width: '61rem' }}>
                        <Card.Header>
                          <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={3}>
                              <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div" style={{ fontWeight: 'bold', color: 'blue', fontSize: 20 }}>
                                  {dbo_konten.konten_judul}
                                </Typography>
                              </Grid>
                              <Grid item xs>
                                <Typography>
                                  <Button style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: "auto" }} startIcon={<EditIcon />} color="success" onClick={handleClickOpen}>Update</Button>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Card.Header>
                        <Card.Body>
                          <Card.Title style={{ fontWeight: 'bold', color: 'indigo', fontSize: 18 }}>{dbo_konten.konten_subjudul}</Card.Title>
                          <CardGroup>
                            <Card>
                              <Card.Img variant="top" src={`http://192.168.100.215:8080${dbo_konten.file_path}`} width={224} height={260} />
                              <Card.Footer class="card-footer d-flex">
                                <ButtonGroup className="btn-lg mx-auto">
                                  <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus Foto</Button>
                                </ButtonGroup>
                              </Card.Footer>
                            </Card>
                            <Card>
                              <Card.Img variant="top" src={`http://192.168.100.215:8080${dbo_konten.file_path2}`} width={224} height={260} />
                              <Card.Footer class="card-footer d-flex">
                                <ButtonGroup className="btn-lg mx-auto">
                                  <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus Foto</Button>
                                </ButtonGroup>
                              </Card.Footer>
                            </Card>
                            <Card>
                              <Card.Img variant="top" src={`http://192.168.100.215:8080${dbo_konten.file_path3}`} width={224} height={260} />
                              <Card.Footer class="card-footer d-flex">
                                <ButtonGroup className="btn-lg mx-auto">
                                  <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus Foto</Button>
                                </ButtonGroup>
                              </Card.Footer>
                            </Card>
                          </CardGroup>
                          <br />
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Deskripsi</Accordion.Header>
                              <Accordion.Body>
                                <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_deskripsi }} />
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Syarat</Accordion.Header>
                              <Accordion.Body>
                                <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_syarat }} />
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>Ketentuan</Accordion.Header>
                              <Accordion.Body>
                                <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_ketentuan }} />
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                              <Accordion.Header>Fasilitas dan Manfaat</Accordion.Header>
                              <Accordion.Body>
                                <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_fasilitas }} />
                              </Accordion.Body>
                            </Accordion.Item>
                            {/* <Accordion.Item eventKey="1">
        <Accordion.Header>Promosi</Accordion.Header>
        <Accordion.Body>
        <div style={{whiteSpace: "pre-wrap"}}>{dbo_konten.konten_promosi}</div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Simulasi</Accordion.Header>
        <Accordion.Body>
        <div style={{whiteSpace: "pre-wrap"}}>{dbo_konten.konten_simulasi}</div>
        </Accordion.Body>
      </Accordion.Item> */}
                            <Accordion.Item eventKey="4">
                              <Accordion.Header>SK/SE</Accordion.Header>
                              <Accordion.Body>
                                <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_sk }} />
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                          {/* Menampilkan modal update data */}
                          <Box className={classes.box}>
                            <UpdateDetail open={open} handleClose={handleClose} />
                          </Box>
                        </Card.Body>
                      </Card>
                    </>
                  )
                }
              })()}
            </>
          )
        }
        if (dbo_user.user_admin === "3") {
          return (
            <>
              <style>{`
                table,tr,td{
                border:1px solid black;
                text-align: left;
                padding: 8px;
                background-color: #f5f5f5;
                }
                `}</style>
              <Card border="primary" style={{ width: '61rem' }}>
                <Card.Header>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div" style={{ fontWeight: 'bold', color: 'blue', fontSize: 20 }}>
                          {dbo_konten.konten_judul}
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography>
                          <Button style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: "auto" }} startIcon={<EditIcon />} color="success" onClick={handleClickOpen}>Update</Button>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Card.Header>
                <Card.Body>
                  <Card.Title style={{ fontWeight: 'bold', color: 'indigo', fontSize: 18 }}>{dbo_konten.konten_subjudul}</Card.Title>
                  <CardGroup>
                    <Card>
                      <Card.Img variant="top" src={`http://192.168.100.215:8080${dbo_konten.file_path}`} width={224} height={260} />
                      <Card.Footer class="card-footer d-flex">
                        <ButtonGroup className="btn-lg mx-auto">
                          <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus Foto</Button>
                        </ButtonGroup>
                      </Card.Footer>
                    </Card>
                    <Card>
                      <Card.Img variant="top" src={`http://192.168.100.215:8080${dbo_konten.file_path2}`} width={224} height={260} />
                      <Card.Footer class="card-footer d-flex">
                        <ButtonGroup className="btn-lg mx-auto">
                          <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus Foto</Button>
                        </ButtonGroup>
                      </Card.Footer>
                    </Card>
                    <Card>
                      <Card.Img variant="top" src={`http://192.168.100.215:8080${dbo_konten.file_path3}`} width={224} height={260} />
                      <Card.Footer class="card-footer d-flex">
                        <ButtonGroup className="btn-lg mx-auto">
                          <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus Foto</Button>
                        </ButtonGroup>
                      </Card.Footer>
                    </Card>
                  </CardGroup>
                  <br />
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Deskripsi</Accordion.Header>
                      <Accordion.Body>
                        <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_deskripsi }} />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Syarat</Accordion.Header>
                      <Accordion.Body>
                        <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_syarat }} />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Ketentuan</Accordion.Header>
                      <Accordion.Body>
                        <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_ketentuan }} />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Fasilitas dan Manfaat</Accordion.Header>
                      <Accordion.Body>
                        <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_fasilitas }} />
                      </Accordion.Body>
                    </Accordion.Item>
                    {/* <Accordion.Item eventKey="1">
        <Accordion.Header>Promosi</Accordion.Header>
        <Accordion.Body>
        <div style={{whiteSpace: "pre-wrap"}}>{dbo_konten.konten_promosi}</div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Simulasi</Accordion.Header>
        <Accordion.Body>
        <div style={{whiteSpace: "pre-wrap"}}>{dbo_konten.konten_simulasi}</div>
        </Accordion.Body>
      </Accordion.Item> */}
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>SK/SE</Accordion.Header>
                      <Accordion.Body>
                        <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_sk }} />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  {/* Menampilkan modal update data */}
                  <Box className={classes.box}>
                    <UpdateDetail open={open} handleClose={handleClose} />
                  </Box>
                </Card.Body>
              </Card>
            </>
          )
        }
      })()}
    </>
  );
}

export default DetailKreditKonsumerList;