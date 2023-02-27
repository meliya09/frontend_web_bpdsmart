import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import swal from 'sweetalert';
import Card from 'react-bootstrap/Card';
import { SentimentSatisfiedSharp } from "@material-ui/icons";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// import { uid } from "uid";

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


export default function FormUpdateDivisi() {
  const classes = useStyles();
  const navigate = useNavigate();
  const axios = require('axios')

  const { id } = useParams();
  const [level_nama, setLevelNama] = useState("");

  useEffect(() => {
    getDivisi(); 
  }, []);

  const getDivisi = async () => {
    const response = await axios.get(`http://192.168.100.215:8080/level/${id}`);
    setLevelNama(response.data.level_nama);
  };


  const updateDivisi = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("level_nama", level_nama);
    try {
      await axios.post(`http://192.168.100.215:8080/level/update/${id}`, formData, {
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
          navigate(-1);
        })
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Card border="primary" style={{ width: '61rem' }}>
        <Card.Header style={{ fontWeight: 'bold', color: 'blue', fontSize: 20 }} >Update</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Nama Level User
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={level_nama}
                  onChange={(e) => setLevelNama(e.target.value)} />
              </Col>
            </Form.Group>
           
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button onClick={() => navigate(-1)} variant="danger" size="sm" active>
                  Cancel
                </Button>{' '}
                <Button  onClick={updateDivisi} variant="primary" size="sm" active>
                  Submit
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

    </>
  );
};
