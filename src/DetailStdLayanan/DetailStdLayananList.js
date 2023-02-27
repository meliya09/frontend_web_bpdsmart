import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import UpdateDetail from "./UpdateDetail";

const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    padding: 8
  }
}));

function DetailStdLayananList() {
  const classes = useStyles();
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
      axios.get(`http://192.168.100.215:8080/detailstdlayanan/${id}`)
        .then(res => {
          setDetail(res.data)
        })
    }
  }, [id]);

  return (
    <>
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
          <Card style={{ width: '59rem', backgroundColor: "#e0e0e0" }}>
            <Card.Header style={{ fontWeight: 'bold', color: 'indigo', fontSize: 16 }} >Deskripsi</Card.Header>
            <Card.Body>
              <Card.Text>
                <Typography variant="body2" style={{ textAlign: 'justify', color: '#424242', fontSize: 15 }}>
                  <div style={{ whiteSpace: "pre-wrap" }}>{dbo_konten.konten_deskripsi}</div>
                </Typography>
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Menampilkan modal update data */}
          <Box className={classes.box}>
            <UpdateDetail open={open} handleClose={handleClose} />
          </Box>
        </Card.Body>
      </Card>
    </>
  );
}

export default DetailStdLayananList;