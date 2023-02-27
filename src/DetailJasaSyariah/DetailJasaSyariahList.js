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


const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

function DetailJasaSyariahList() {
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
      axios.get(`http://192.168.100.215:8080/detailjasasyariah/${id}`)
        .then(res => {
          setDetail(res.data)
        })
    }
  }, [id]);


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
                {/* <br />
            <br />
            <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItem="flex-end"
              className={classes.box}
            >
              <Button startIcon={<EditIcon />} size="small" color="success" variant="outlined" onClick={OpenDeskripsi}>Update</Button>
              <UpdateDeskripsi deskripsi={deskripsi} CloseDeskripsi={CloseDeskripsi} />
            </Box> */}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Syarat</Accordion.Header>
              <Accordion.Body>
               <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_syarat }} />
                {/* <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItem="flex-end"
              className={classes.box}
            >
              <Button startIcon={<EditIcon />} size="small" color="success" variant="outlined" onClick={OpenSyarat} >Update</Button>
              <UpdateSyarat syarat={syarat} CloseSyarat={CloseSyarat} />
            </Box> */}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Ketentuan</Accordion.Header>
              <Accordion.Body>
                 <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_ketentuan }} />
                {/* <div><ul style={{listStyleType: 'disc'}} >{dbo_konten.konten_ketentuan}</ul></div> */}
                {/* <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItem="flex-end"
              className={classes.box}
            >
              <Button startIcon={<EditIcon />} size="small" color="success" variant="outlined" onClick={OpenKetentuan}>Update</Button>
              <UpdateKetentuan ketentuan={ketentuan} CloseKetentuan={CloseKetentuan} />
            </Box> */}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Fasilitas dan Manfaat</Accordion.Header>
              <Accordion.Body>
                 <div dangerouslySetInnerHTML={{ __html: dbo_konten.konten_fasilitas }} />
                {/* <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItem="flex-end"
              className={classes.box}
            >
              <Button startIcon={<EditIcon />} size="small" color="success" variant="outlined" onClick={OpenFasilitas}>Update</Button>
              <UpdateFasilitas fasilitas={fasilitas} CloseFasilitas={CloseFasilitas} />
            </Box> */}
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
                {/* <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItem="flex-end"
              className={classes.box}
            >
              <Button startIcon={<EditIcon />} size="small" color="success" variant="outlined" onClick={OpenSkSe}>Update</Button>
              <UpdateSkSe SkSe={SkSe} CloseSkSe={CloseSkSe} />
            </Box> */}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Menampilkan modal update data */}
          <Box className={classes.box}>
            <UpdateDetail open={open} handleClose={handleClose} />
          </Box>
        </Card.Body>
      </Card>

      {/* <div class="d-flex justify-content-center">
        <Card style={{ width: '20rem' }}>
          <Card.Img variant="top" src={`http://192.168.100.215:8080${dbo_konten.file_path}`}></Card.Img>
          <Card.Body>
            <Card.Title>{dbo_konten.konten_judul}</Card.Title>
            <Card.Subtitle>{dbo_konten.konten_subjudul}</Card.Subtitle>
            <br />
            <Box  
              m={1}
              display="flex"
              justifyContent="center"
              alignItem="center"
              className={classes.box}
            >
              <ButtonGroup color="primary" aria-label="outlined primary button group">
              <Button startIcon={<EditIcon />} color="success" onClick={handleClickOpen}>Update</Button>
                <Button startIcon={<DeleteIcon />} size="small" color="error" >Hapus</Button>
              </ButtonGroup>
              <UpdateDetail open={open} handleClose={handleClose} />
            </Box>
          </Card.Body>
        </Card>
      </div> */}
    </>
  );
}

export default DetailJasaSyariahList;